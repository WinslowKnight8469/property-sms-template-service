import { z } from "zod";

export const maintenanceRequest = z.object({
  propertyId: z.string().min(1),
  unit: z.string().min(1),
  issue: z.string().min(1),
  tenantPhone: z.string().min(7)
});

export const tenantDocument = z.object({
  tenantId: z.string().min(1),
  documentName: z.string().min(1),
  expiresOn: z.string().date()
});

export const inspectionReminder = z.object({
  propertyId: z.string().min(1),
  inspectionDate: z.string().date(),
  tenantPhone: z.string().min(7)
});

export type Template = { name: string; signature: string; body: string; approved: boolean };

export const approvedTemplates: Record<string, Template> = {
  maintenance: {
    name: "maintenance-request",
    signature: "Harbor Homes",
    body: "Hi {unit}, we logged your maintenance request: {issue}.",
    approved: true
  },
  inspection: {
    name: "inspection-reminder",
    signature: "Harbor Homes",
    body: "Inspection reminder for {date}. Reply to your property team with questions.",
    approved: true
  }
};

export function renderMaintenance(input: unknown): string {
  const request = maintenanceRequest.parse(input);
  const template = approvedTemplates.maintenance;
  if (!template.approved) throw new Error("Template is not approved");
  return `${template.body.replace("{unit}", request.unit).replace("{issue}", request.issue)} ${template.signature}`;
}

export function renderInspection(input: unknown): string {
  const reminder = inspectionReminder.parse(input);
  const template = approvedTemplates.inspection;
  if (!template.approved) throw new Error("Template is not approved");
  return `${template.body.replace("{date}", reminder.inspectionDate)} ${template.signature}`;
}
