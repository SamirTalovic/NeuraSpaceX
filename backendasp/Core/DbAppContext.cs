using Microsoft.EntityFrameworkCore;
using Neura.Models;
using System.Collections.Generic;

namespace Neura.Context
{
    public class DbAppContext : DbContext
    {
        public DbAppContext(DbContextOptions<DbAppContext> options)
        : base(options) { }

        public DbSet<Launch> Launches => Set<Launch>();
    }
}
