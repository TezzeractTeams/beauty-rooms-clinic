import faqRaw from "../../faqdata.json";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqServiceGroup {
  service: string;
  items: FaqEntry[];
}

export interface FaqCategoryGroup {
  category: string;
  services: FaqServiceGroup[];
}

type RawRow = {
  "SERVICE GATEGORY": string;
  SERVICE: string;
  QUESTION: string;
  "BEAUTY ROOMS CLINIC RESPONSE": string;
};

function buildGroups(): FaqCategoryGroup[] {
  const rows = faqRaw as RawRow[];
  const filtered = rows.filter(
    (r) => r.QUESTION?.trim() && r["BEAUTY ROOMS CLINIC RESPONSE"]?.trim(),
  );

  const catMap = new Map<string, Map<string, FaqEntry[]>>();

  for (const row of filtered) {
    const cat = row["SERVICE GATEGORY"].trim();
    const svc = row.SERVICE.trim();
    if (!catMap.has(cat)) catMap.set(cat, new Map());
    const svcMap = catMap.get(cat)!;
    if (!svcMap.has(svc)) svcMap.set(svc, []);
    svcMap.get(svc)!.push({
      question: row.QUESTION.trim(),
      answer: row["BEAUTY ROOMS CLINIC RESPONSE"].trim(),
    });
  }

  return [...catMap.entries()].map(([category, svcMap]) => ({
    category,
    services: [...svcMap.entries()].map(([service, items]) => ({
      service,
      items,
    })),
  }));
}

export const faqCategories = buildGroups();
