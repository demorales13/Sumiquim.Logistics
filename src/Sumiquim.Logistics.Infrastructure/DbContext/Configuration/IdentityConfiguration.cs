using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.Infrastructure.DbContext.Configuration;

public class SumiquimUserConfiguration : IEntityTypeConfiguration<SumiquimUser>
{
    public void Configure(EntityTypeBuilder<SumiquimUser> builder)
    {
        builder.ToTable("Users", "security");
    }
}

public class SumiquimRoleConfiguration : IEntityTypeConfiguration<SumiquimRole>
{
    public void Configure(EntityTypeBuilder<SumiquimRole> builder)
    {
        builder.ToTable("Roles", "security");
    }
}

public class IdentityUserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<long>>
{
    public void Configure(EntityTypeBuilder<IdentityUserRole<long>> builder)
    {
        builder.ToTable("UserRoles", "security");
    }
}

public class IdentityUserClaimConfiguration : IEntityTypeConfiguration<IdentityUserClaim<long>>
{
    public void Configure(EntityTypeBuilder<IdentityUserClaim<long>> builder)
    {
        builder.ToTable("UserClaims", "security");
    }
}

public class IdentityUserLoginConfiguration : IEntityTypeConfiguration<IdentityUserLogin<long>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<long>> builder)
    {
        builder.ToTable("UserLogins", "security");
    }
}

public class IdentityRoleClaimConfiguration : IEntityTypeConfiguration<IdentityRoleClaim<long>>
{
    public void Configure(EntityTypeBuilder<IdentityRoleClaim<long>> builder)
    {
        builder.ToTable("RoleClaims", "security");
    }
}

public class IdentityUserTokenConfiguration : IEntityTypeConfiguration<IdentityUserToken<long>>
{
    public void Configure(EntityTypeBuilder<IdentityUserToken<long>> builder)
    {
        builder.ToTable("UserTokens", "security");
    }
}