using EFCore.BulkExtensions;

using Google.Cloud.Firestore;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Utilities.Migration;

Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "firebase-key.json");

var db = new SumiquimContext();
await db.Database.EnsureCreatedAsync();

var fire = FirestoreDb.Create("tu-proyecto");
var col = fire.Collection("shipping-scheduling");

// rangos que quieras
int from = 20240101;
int to = 20240630;

var query = col
    .WhereGreaterThanOrEqualTo("date", from)
    .WhereLessThanOrEqualTo("date", to);

var docs = await query.GetSnapshotAsync();

// mapeo rápido
var batch = docs.Documents.Select(doc =>
{
    var d = doc.ToDictionary();
    return new ShippingScheduling
    {
        Address = d.GetValueOrDefault("address")?.ToString(),
        Batch = d.GetValueOrDefault("batch")?.ToString(),
        CarrierCompany = d.GetValueOrDefault("carrierCompany")?.ToString(),
        City = d.GetValueOrDefault("city")?.ToString(),
        Client = d.GetValueOrDefault("client")?.ToString(),
        Code = d.GetValueOrDefault("code")?.ToString(),
        Date = d.GetValueOrDefault("date") != null ? Convert.ToInt32(d["date"]) : null,
        Guide = d.GetValueOrDefault("guide")?.ToString(),
        Item = d.GetValueOrDefault("item")?.ToString(),
        Notes = d.GetValueOrDefault("notes")?.ToString(),
        PurchaseOrder = d.GetValueOrDefault("purchaseOrder")?.ToString(),
        Quantity = d.GetValueOrDefault("quantity")?.ToString(),
        SalesAdvisor = d.GetValueOrDefault("salesAdvisor")?.ToString(),
        SchedulingNotification = d.GetValueOrDefault("schedulingNotification")?.ToString(),
        ShipmentNotification = d.GetValueOrDefault("shipmentNotification")?.ToString(),
        Warehouse = d.GetValueOrDefault("warehouse")?.ToString(),
        Location = d.GetValueOrDefault("location")?.ToString()
    };
}).ToList();

// Bulk insert en una sola ida
await db.BulkInsertAsync(batch);

Console.WriteLine($"Migrados {batch.Count} registros ({from} – {to})");