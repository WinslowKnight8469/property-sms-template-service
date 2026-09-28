import { renderMaintenance } from "../src/property_sms.js";
import { infrai } from "../src/infrai.js";

const message = renderMaintenance({
  propertyId: "oak-17",
  unit: "3B",
  issue: "leaking kitchen tap",
  tenantPhone: process.env.DEMO_TENANT_PHONE ?? "+15550001111"
});
console.log({ message });

const messageId = process.env.INFRAI_SMS_MESSAGE_ID;
if (messageId) console.log(await infrai.sms.events(messageId));
