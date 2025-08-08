using Microsoft.Data.SqlClient;

using System.Text;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingQuery;

public static class ShippingSchedulingSqlBuilder
{
    public static (string Sql, SqlParameter[] Parameters) Build(GetShippingSchedulingQuery request)
    {
        var sql = new StringBuilder("SELECT * FROM dbo.ShippingScheduling WHERE 1=1");
        var parameters = new List<SqlParameter>();

        if (!string.IsNullOrWhiteSpace(request.Client))
        {
            sql.Append(" AND [Client] = @Client");
            parameters.Add(new SqlParameter("@Client", request.Client));
        }

        if (!string.IsNullOrWhiteSpace(request.City))
        {
            sql.Append(" AND [City] = @City");
            parameters.Add(new SqlParameter("@City", request.City));
        }

        if (!string.IsNullOrWhiteSpace(request.CarrierCompany))
        {
            sql.Append(" AND [CarrierCompany] = @CarrierCompany");
            parameters.Add(new SqlParameter("@CarrierCompany", request.CarrierCompany));
        }

        if (request.Date.HasValue)
        {
            sql.Append(" AND CAST([Date] AS DATE) = @Date");
            parameters.Add(new SqlParameter("@Date", request.Date.Value.Date));
        }

        if (!string.IsNullOrWhiteSpace(request.Code))
        {
            sql.Append(" AND [Code] = @Code");
            parameters.Add(new SqlParameter("@Code", request.Code));
        }

        if (!string.IsNullOrWhiteSpace(request.PurchaseOrder))
        {
            sql.Append(" AND [PurchaseOrder] = @PurchaseOrder");
            parameters.Add(new SqlParameter("@PurchaseOrder", request.PurchaseOrder));
        }

        if (!string.IsNullOrWhiteSpace(request.SchedulingNotification))
        {
            sql.Append(" AND [SchedulingNotification] = @SchedulingNotification");
            parameters.Add(new SqlParameter("@SchedulingNotification", request.SchedulingNotification));
        }

        if (!string.IsNullOrWhiteSpace(request.ShipmentNotification))
        {
            sql.Append(" AND [ShipmentNotification] = @ShipmentNotification");
            parameters.Add(new SqlParameter("@ShipmentNotification", request.ShipmentNotification));
        }

        return (sql.ToString(), parameters.ToArray());
    }
}
