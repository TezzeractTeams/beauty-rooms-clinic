import { useCallback, useReducer } from "react";
import {
  addCartCardPaymentMethod,
  addCartSelectedBookableItem,
  AppointmentDetails,
  BookableDate,
  BookableTime,
  CartAppointment,
  cartBookableDates,
  cartBookableTimes,
  checkoutCart,
  ClientInformation,
  createCart,
  getCartSpecialistDisplayName,
  reserveCartBookableItems,
  updateCart,
} from "../utils/boulevardApi";
import { SALON_TIMEZONE } from "../utils/salonTimezone";
import { CardData, tokenizeCard } from "../utils/tokenize";

const LOCATION_ID = import.meta.env.VITE_BLVD_LOCATION_ID as string;

export type BookingStep = "datetime" | "payment" | "confirmed";

interface BookingState {
  step: BookingStep;
  cartId: string | null;
  availableDates: BookableDate[];
  availableTimes: BookableTime[];
  selectedDate: string | null;
  selectedTime: BookableTime | null;
  appointments: AppointmentDetails[];
  /** Specialist name from cart after time is reserved; shown on confirmation. */
  specialistName: string | null;
  loading: boolean;
  error: string | null;
}

type BookingAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CART_CREATED"; payload: { cartId: string } }
  | { type: "DATES_LOADED"; payload: { dates: BookableDate[] } }
  | { type: "DATE_SELECTED"; payload: { date: string } }
  | { type: "TIMES_LOADED"; payload: { times: BookableTime[] } }
  | { type: "TIME_SELECTED"; payload: { time: BookableTime } }
  | { type: "ADVANCE_TO"; payload: { step: BookingStep } }
  | { type: "CHECKOUT_DONE"; payload: { appointments: AppointmentDetails[] } }
  | { type: "SPECIALIST_SET"; payload: string | null }
  | { type: "RESET" };

const initialState: BookingState = {
  step: "datetime",
  cartId: null,
  availableDates: [],
  availableTimes: [],
  selectedDate: null,
  selectedTime: null,
  appointments: [],
  specialistName: null,
  loading: false,
  error: null,
};

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CART_CREATED":
      return { ...state, cartId: action.payload.cartId };
    case "DATES_LOADED":
      return { ...state, availableDates: action.payload.dates, loading: false };
    case "DATE_SELECTED":
      return { ...state, selectedDate: action.payload.date, availableTimes: [], selectedTime: null };
    case "TIMES_LOADED":
      return { ...state, availableTimes: action.payload.times, loading: false };
    case "TIME_SELECTED":
      return { ...state, selectedTime: action.payload.time };
    case "ADVANCE_TO":
      return { ...state, step: action.payload.step, loading: false, error: null };
    case "CHECKOUT_DONE":
      return { ...state, appointments: action.payload.appointments, step: "confirmed", loading: false };
    case "SPECIALIST_SET":
      return { ...state, specialistName: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function buildDateRange(): { lower: string; upper: string } {
  const now = new Date();
  const lower = now.toISOString().slice(0, 10);
  const future = new Date(now);
  future.setDate(future.getDate() + 60);
  const upper = future.toISOString().slice(0, 10);
  return { lower, upper };
}

function mapCartAppointmentsToDisplay(
  rows: CartAppointment[],
  ctx: {
    selectedTime: BookableTime | null;
    clientInfo: ClientInformation;
    serviceName: string;
    specialistName: string | null;
  },
): AppointmentDetails[] {
  const clientName = `${ctx.clientInfo.firstName} ${ctx.clientInfo.lastName}`.trim();
  return rows.map((row) => ({
    id: row.appointmentId,
    startAt: ctx.selectedTime?.startTime ?? "",
    duration: 0,
    location: { name: "" },
    appointmentServices: [{ service: { name: ctx.serviceName } }],
    client: { name: clientName },
    specialistName: ctx.specialistName,
  }));
}

export function useBooking(
  serviceId: string,
  serviceName: string,
  clientInformation: ClientInformation,
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const cartId = await createCart(LOCATION_ID);
      dispatch({ type: "CART_CREATED", payload: { cartId } });
      await addCartSelectedBookableItem(cartId, serviceId);

      const { lower, upper } = buildDateRange();
      const dates = await cartBookableDates(cartId, lower, upper, SALON_TIMEZONE);
      dispatch({ type: "DATES_LOADED", payload: { dates } });
      return { ok: true };
    } catch (err) {
      const message = (err as Error).message;
      dispatch({ type: "SET_ERROR", payload: message });
      return { ok: false, error: message };
    }
  }, [serviceId]);

  const selectDate = useCallback(
    async (date: string) => {
      if (!state.cartId) return;
      dispatch({ type: "DATE_SELECTED", payload: { date } });
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const times = await cartBookableTimes(state.cartId, date, SALON_TIMEZONE);
        dispatch({ type: "TIMES_LOADED", payload: { times } });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: (err as Error).message });
      }
    },
    [state.cartId],
  );

  const selectTime = useCallback((time: BookableTime) => {
    dispatch({ type: "TIME_SELECTED", payload: { time } });
  }, []);

  const confirmDateTime = useCallback(async () => {
    if (!state.cartId || !state.selectedTime) return;
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await reserveCartBookableItems(state.cartId, state.selectedTime.id);
      const specialistName = await getCartSpecialistDisplayName(state.cartId);
      dispatch({ type: "SPECIALIST_SET", payload: specialistName });
      await updateCart(state.cartId, clientInformation);
      dispatch({ type: "ADVANCE_TO", payload: { step: "payment" } });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: (err as Error).message });
    }
  }, [state.cartId, state.selectedTime, clientInformation]);

  const submitPayment = useCallback(
    async (card: CardData) => {
      if (!state.cartId) return;
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const token = await tokenizeCard(card);
        await addCartCardPaymentMethod(state.cartId, token);
        const cartAppointments = await checkoutCart(state.cartId);
        const appointments = mapCartAppointmentsToDisplay(cartAppointments, {
          selectedTime: state.selectedTime,
          clientInfo: clientInformation,
          serviceName,
          specialistName: state.specialistName,
        });
        dispatch({ type: "CHECKOUT_DONE", payload: { appointments } });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: (err as Error).message });
      }
    },
    [state.cartId, state.selectedTime, state.specialistName, clientInformation, serviceName],
  );

  const goBack = useCallback(() => {
    const prev: Record<BookingStep, BookingStep | null> = {
      datetime: null,
      payment: "datetime",
      confirmed: null,
    };
    const target = prev[state.step];
    if (target) dispatch({ type: "ADVANCE_TO", payload: { step: target } });
  }, [state.step]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    state,
    initialize,
    selectDate,
    selectTime,
    confirmDateTime,
    submitPayment,
    goBack,
    reset,
  };
}
