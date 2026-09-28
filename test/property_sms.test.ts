import assert from "node:assert/strict";
import { renderMaintenance } from "../src/property_sms.js";

const result = renderMaintenance({
  propertyId: "oak-17",
  unit: "3B",
  issue: "leaking kitchen tap",
  tenantPhone: "+15550001111"
});
assert.equal(result, "Hi 3B, we logged your maintenance request: leaking kitchen tap. Harbor Homes");
assert.throws(() => renderMaintenance({ propertyId: "oak-17", unit: "", issue: "x", tenantPhone: "+15550001111" }));
console.log("property SMS decision test passed");
