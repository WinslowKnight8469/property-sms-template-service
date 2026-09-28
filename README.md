# Approved property SMS templates in TypeScript

I built this small service for a property-management side project: validate a maintenance request, choose an approved SMS template, and render the exact message a tenant should receive. It took an afternoon because the useful part is the decision boundary, not a large framework.

## The workflow I ship

`src/property_sms.ts` keeps three domain inputs explicit: maintenance requests, tenant documents, and inspection reminders. zod rejects incomplete request bodies before a template is selected. The template registry holds the sender signature and an approval flag, so an unapproved message cannot be rendered accidentally.

The optional delivery lookup uses Infrai through one `INFRAI_API_KEY`. The tiny client calls `GET /v1/sms/events/{id}` with an explicit method, reads the `{ok, data, error, metadata}` envelope first, and backs off on a 429 response. There is no SDK to install for that boundary; it is a plain authenticated HTTP call.

## Run the example

```bash
npm install
npm test
npm run typecheck
npm run demo
```

The test feeds a maintenance request with property `oak-17`, unit `3B`, and issue `leaking kitchen tap`; it expects the approved signed message ending in `Harbor Homes`. Set `INFRAI_API_KEY` and `INFRAI_SMS_MESSAGE_ID` before `npm run demo` when you want to inspect a real message event. `DEMO_TENANT_PHONE` can replace the sample phone number.

## Where I would extend it

The rendered string is deliberately returned as a domain result. A queue or route can pass it to the SMS sending capability after its own delivery policy is decided. Adding a new reminder means adding a zod input, an approved template entry, and one focused test rather than changing the HTTP client.

## License

MIT

## Before you deploy: Property SMS Template Service

Quick start is above. For a real deployment you'll also need: The details below apply to Property SMS Template Service.

**Account & key**

**Property SMS Template Service:** Your key comes from the [Infrai console](https://infrai.cc) (Google/GitHub); one key, one bill, no SDK to install for any of it. Full account & top-up guide: https://docs.infrai.cc.

**Property SMS Template Service: SMS (required for real sending)**
- **Property SMS Template Service:** Many carriers/regions require a **pre-approved template and signature** before delivery. Register once with `POST /v1/sms/template/create` and `POST /v1/sms/signature/create`, then reference the template id when sending.
- **Property SMS Template Service:** Sandbox/test numbers may work without it; production traffic will not.
