import Layout from "@/components/Layout";
import { BookingFlowPanel } from "@/components/booking/BookingFlowPanel";
import { BookingIntakePanel, type BookingIntakeValues } from "@/components/booking/BookingIntakePanel";
import { useBooking } from "@/components/booking/hooks/useBooking";
import {
  fetchBookingCatalog,
  findCategoryById,
  findProviderBySlug,
  findServiceBySlug,
  type BookingCategoryId,
  type BookingProviderOption,
} from "@/components/booking/utils/bookingCatalogApi";
import type { ClientInformation } from "@/components/booking/utils/boulevardApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Clock3 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

type BookingStage = "catalog" | "details" | "flow";

const CARD_BORDER = "border border-[rgba(103,92,83,0.12)]";

function formatUsd(value: number) {
  return `$${value.toFixed(0)}`;
}

function sanitizeStage(stageRaw: string | null): BookingStage {
  if (stageRaw === "details" || stageRaw === "flow") return stageRaw;
  return "catalog";
}

export default function Booking() {
  const { data: catalog, isLoading, isError, error } = useQuery({
    queryKey: ["booking-catalog"],
    queryFn: fetchBookingCatalog,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [intakeValues, setIntakeValues] = useState<BookingIntakeValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false,
    providerSlug: "first-available",
  });

  const activeStage = sanitizeStage(searchParams.get("stage"));
  const categoryFromUrl = searchParams.get("category");
  const serviceFromUrl = searchParams.get("service");
  const providerFromUrl = searchParams.get("provider");

  const selectedCategory = useMemo(() => findCategoryById(catalog ?? { categories: [], services: [] }, categoryFromUrl), [
    catalog,
    categoryFromUrl,
  ]);
  const selectedService = useMemo(() => findServiceBySlug(catalog ?? { categories: [], services: [] }, serviceFromUrl), [
    catalog,
    serviceFromUrl,
  ]);
  const selectedProvider = useMemo(
    () => findProviderBySlug(selectedService, providerFromUrl) ?? selectedService?.providers[0] ?? null,
    [providerFromUrl, selectedService],
  );

  const bookingClientInfo = useMemo(
    (): ClientInformation => ({
      firstName: intakeValues.firstName.trim(),
      lastName: intakeValues.lastName.trim(),
      email: intakeValues.email.trim(),
      phoneNumber: intakeValues.phone.trim(),
    }),
    [intakeValues],
  );

  const { initialize, reset, ...bookingPanel } = useBooking(
    selectedService?.id ?? "",
    selectedService?.name ?? "Booking",
    bookingClientInfo,
    {
      preferredProviderName:
        selectedProvider?.slug === "first-available" ? null : (selectedProvider?.name ?? null),
      preferredProviderSlug: selectedProvider?.slug ?? "first-available",
    },
  );

  useEffect(() => {
    if (!catalog || catalog.categories.length === 0 || catalog.services.length === 0) return;
    const next = new URLSearchParams(searchParams);
    let changed = false;

    const category = selectedCategory?.id ?? catalog.categories[0]?.id ?? "";
    if (next.get("category") !== category) {
      next.set("category", category);
      changed = true;
    }

    const service =
      selectedService?.slug ??
      catalog.services.find((s) => s.category === category)?.slug ??
      catalog.services[0].slug;
    if (next.get("service") !== service) {
      next.set("service", service);
      changed = true;
    }

    const hydratedService = findServiceBySlug(catalog, service);
    const provider =
      findProviderBySlug(hydratedService, next.get("provider"))?.slug ??
      hydratedService?.providers[0]?.slug ??
      "first-available";
    if (next.get("provider") !== provider) {
      next.set("provider", provider);
      changed = true;
    }

    const stage = sanitizeStage(next.get("stage"));
    if (!hydratedService && stage !== "catalog") {
      next.set("stage", "catalog");
      changed = true;
    } else if (next.get("stage") !== stage) {
      next.set("stage", stage);
      changed = true;
    }

    if (changed) setSearchParams(next, { replace: true });
  }, [catalog, searchParams, selectedCategory, selectedService, setSearchParams]);

  useEffect(() => {
    if (!selectedProvider) return;
    setIntakeValues((prev) =>
      prev.providerSlug === selectedProvider.slug ? prev : { ...prev, providerSlug: selectedProvider.slug },
    );
  }, [selectedProvider]);

  useEffect(() => {
    if (!selectedService || activeStage !== "flow") return;
    if (!bookingPanel.state.cartId) {
      const next = new URLSearchParams(searchParams);
      next.set("stage", "details");
      setSearchParams(next, { replace: true });
    }
  }, [activeStage, bookingPanel.state.cartId, searchParams, selectedService, setSearchParams]);

  const providersForSelectedService: BookingProviderOption[] = selectedService?.providers ?? [];

  const setParamState = (patch: Partial<Record<"category" | "service" | "provider" | "stage", string>>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (!value) continue;
      next.set(key, value);
    }
    setSearchParams(next, { replace: false });
  };

  const handlePickCategory = (categoryId: BookingCategoryId) => {
    if (!catalog) return;
    const service = catalog.services.find((item) => item.category === categoryId);
    if (!service) return;
    setParamState({
      category: categoryId,
      service: service.slug,
      provider: service.providers[0]?.slug ?? "first-available",
      stage: "catalog",
    });
  };

  const handlePickService = (serviceSlug: string) => {
    if (!catalog) return;
    const service = findServiceBySlug(catalog, serviceSlug);
    if (!service) return;
    reset();
    setParamState({
      category: service.category,
      service: service.slug,
      provider: service.providers[0]?.slug ?? "first-available",
      stage: "details",
    });
  };

  const handleIntakeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService) return;
    if (!intakeValues.firstName.trim() || !intakeValues.lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!intakeValues.phone.trim() || !intakeValues.email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!intakeValues.consent) {
      toast.error("Please agree to the Privacy Policy and communications consent to continue.");
      return;
    }

    setSubmitting(true);
    const result = await initialize();
    setSubmitting(false);
    if (!result.ok) {
      toast.error(result.error ?? "Could not start booking. Please try again.");
      return;
    }
    setParamState({
      stage: "flow",
      provider: intakeValues.providerSlug,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="w-full bg-[#FAFAF5] py-24">
          <div className="mx-auto max-w-5xl px-6 text-center font-barlow text-charcoal/70 md:px-10">
            Loading booking services...
          </div>
        </section>
      </Layout>
    );
  }

  if (isError || !catalog) {
    return (
      <Layout>
        <section className="w-full bg-[#FAFAF5] py-24">
          <div className="mx-auto max-w-5xl px-6 text-center font-barlow text-charcoal/70 md:px-10">
            {(error as Error | undefined)?.message ?? "Could not load booking services right now."}
          </div>
        </section>
      </Layout>
    );
  }

  const activeCategory = selectedCategory?.id ?? catalog.categories[0]?.id ?? "";
  const tabServices = catalog.services.filter((service) => service.category === activeCategory);
  const shouldShowCatalog = activeStage === "catalog";

  return (
    <Layout>
      <section className="w-full bg-[#FAFAF5] py-16 md:py-24" aria-labelledby="booking-page-heading">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:px-10">
          <header className="text-center">
            <p className="font-barlow text-[10px] font-light uppercase tracking-[0.16em] text-warm-brown/85 md:text-xs">
              Online Booking
            </p>
            <h1
              id="booking-page-heading"
              className="mt-3 font-barlow text-[clamp(34px,4.6vw,56px)] font-extralight leading-none tracking-[-0.04em] text-charcoal"
            >
              Choose your service and book in minutes
            </h1>
          </header>

          <div className={cn(CARD_BORDER, "mx-auto w-full max-w-4xl bg-[#F8F7F2] p-4 md:p-6")}>
            {shouldShowCatalog ? (
              <Tabs value={activeCategory} onValueChange={(value) => handlePickCategory(value as BookingCategoryId)}>
                <TabsList className="h-auto w-full justify-start gap-2 rounded-none border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] p-1">
                  {catalog.categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="rounded-none px-4 py-2 font-barlow text-xs font-light uppercase tracking-[0.1em] data-[state=active]:bg-charcoal data-[state=active]:text-[#FAFAF5]"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeCategory} className="mt-4 space-y-3">
                  {tabServices.map((service) => (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => handlePickService(service.slug)}
                      className={cn(
                        CARD_BORDER,
                        "w-full bg-[#FAFAF5] px-4 py-4 text-left transition-colors hover:bg-[#F1EFE8] md:px-5",
                        selectedService?.slug === service.slug && "border-charcoal/40",
                      )}
                    >
                      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                        <div>
                          <p className="font-barlow text-xl font-extralight tracking-[-0.02em] text-charcoal">{service.name}</p>
                          <p className="mt-2 font-barlow text-sm font-light text-charcoal/80">
                            {(() => {
                              const named = service.providers.filter((p) => p.slug !== "first-available");
                              if (named.length === 0) return "Provider: First available";
                              return `Providers: ${named.map((p) => p.name).join(", ")}`;
                            })()}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="font-barlow text-lg font-light text-charcoal">
                            {formatUsd(service.discountedPriceUsd)}
                            {service.actualPriceUsd > service.discountedPriceUsd + 0.005 ? (
                              <span className="ml-2 text-base text-charcoal/45 line-through">
                                {formatUsd(service.actualPriceUsd)}
                              </span>
                            ) : null}
                          </div>
                          {service.durationMinutes > 0 ? (
                            <p className="mt-1 inline-flex items-center gap-1 font-barlow text-sm font-light text-charcoal/70 md:justify-end">
                              <Clock3 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                              {service.durationMinutes} min
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  ))}
                </TabsContent>
              </Tabs>
            ) : (
              <div className={cn(CARD_BORDER, "bg-[#FAFAF5] p-5 md:p-8")}>
                <button
                  type="button"
                  onClick={() => setParamState({ stage: "catalog" })}
                  className="mb-4 font-barlow text-xs font-light uppercase tracking-[0.1em] text-charcoal/60 transition-colors hover:text-charcoal"
                >
                  Back to services
                </button>
                {activeStage === "details" && selectedService && (
                <BookingIntakePanel
                  idPrefix="booking-page"
                  title={`Book ${selectedService.name}`}
                  subtitle="Add your details and choose your provider to continue."
                  values={intakeValues}
                  onChange={(next) => {
                    setIntakeValues(next);
                    setParamState({ provider: next.providerSlug });
                  }}
                  providers={providersForSelectedService}
                  providerLabel="Provider"
                  submitLabel="Continue to Date & Time"
                  submitting={submitting}
                  onSubmit={handleIntakeSubmit}
                  className="border-0 bg-transparent p-0 shadow-none"
                />
                )}

                {activeStage === "flow" && selectedService && (
                  <BookingFlowPanel
                    {...bookingPanel}
                    serviceName={selectedService.name}
                    className="border-0 bg-transparent shadow-none"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
