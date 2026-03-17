window.zakatCalculator = function () {
  return {
    activeTab: "individu",
    jumlahOrang: 1,
    opsiUangTunai: "fixed",
    hargaBeras: null,
    satuanHarga: "kg",
    totalMuzaki: 0,
    porsiMustahik: 45,
    porsiSabilillah: 40,
    porsiAmil: 15,
    tarifFixed: 45000,
    kgPerSok: 2.75,
    literPerKg: 1.219512,

    totalSho() {
      return this.jumlahOrang > 0 ? this.jumlahOrang : 0;
    },

    totalKg() {
      return this.totalSho() * this.kgPerSok;
    },

    totalLiter() {
      return this.totalKg() * this.literPerKg;
    },

    totalRupiah() {
      if (this.opsiUangTunai === "fixed") {
        return (this.jumlahOrang > 0 ? this.jumlahOrang : 0) * this.tarifFixed;
      } else {
        const harga = parseFloat(this.hargaBeras) || 0;

        if (this.satuanHarga === "kg") {
          return this.totalKg() * harga;
        } else {
          return this.totalLiter() * harga;
        }
      }
    },

    totalPorsi() {
      return (
        (Number(this.porsiMustahik) || 0) +
        (Number(this.porsiSabilillah) || 0) +
        (Number(this.porsiAmil) || 0)
      );
    },

    totalDistSho() {
      return this.totalMuzaki > 0 ? this.totalMuzaki : 0;
    },

    totalDistKg() {
      return this.totalDistSho() * this.kgPerSok;
    },

    totalDistLiter() {
      return this.totalDistKg() * this.literPerKg;
    },

    totalDistRupiah() {
      return (this.totalMuzaki > 0 ? this.totalMuzaki : 0) * this.tarifFixed;
    },

    dataDistribusi() {
      const sho = this.totalDistSho();
      const kg = this.totalDistKg();
      const liter = this.totalDistLiter();
      const rp = this.totalDistRupiah();

      return [
        {
          nama: "Mustahik",
          porsi: this.porsiMustahik,
          sho: sho * (this.porsiMustahik / 100),
          kg: kg * (this.porsiMustahik / 100),
          liter: liter * (this.porsiMustahik / 100),
          rp: rp * (this.porsiMustahik / 100),
          color: "text-blue-700",
          bg: "bg-blue-50",
          border: "border-blue-200",
        },
        {
          nama: "Sabilillah",
          porsi: this.porsiSabilillah,
          sho: sho * (this.porsiSabilillah / 100),
          kg: kg * (this.porsiSabilillah / 100),
          liter: liter * (this.porsiSabilillah / 100),
          rp: rp * (this.porsiSabilillah / 100),
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
        },
        {
          nama: "Amil",
          porsi: this.porsiAmil,
          sho: sho * (this.porsiAmil / 100),
          kg: kg * (this.porsiAmil / 100),
          liter: liter * (this.porsiAmil / 100),
          rp: rp * (this.porsiAmil / 100),
          color: "text-emerald-700",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
        },
      ];
    },

    formatNumber(value) {
      if (value % 1 === 0) return value.toString();

      return value.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    },

    formatRupiah(value) {
      return value.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },

    init() {
      // 1. Cek apakah ada nilai custom yang sudah disimpan pengguna di localStorage
      const savedTarif = localStorage.getItem("zakat_tarifFixed");

      if (savedTarif) {
        // Gunakan nilai dari memori jika ada
        this.tarifFixed = parseInt(savedTarif, 10);
      } else {
        // 2. Jika kosong (pertama kali buka), load dari DB.json
        fetch("DB.json")
          .then((response) => response.json())
          .then((data) => {
            this.tarifFixed = data.standardRate;
          })
          .catch((error) => console.error("Gagal memuat config:", error));
      }

      // 3. Pantau perubahan, simpan otomatis ke localStorage setiap kali diubah
      this.$watch("tarifFixed", (value) => {
        if (value >= 0 && value !== "") {
          localStorage.setItem("zakat_tarifFixed", value);
        }
      });

      this.$watch("jumlahOrang", (value) => {
        if (value < 1 && value !== "") {
          this.jumlahOrang = 1;
        }
      });

      this.$watch("totalMuzaki", (value) => {
        if (value < 0 && value !== "") {
          this.totalMuzaki = 0;
        }
      });
    },
  };
};

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          900: "#064e3b",
        },
      },
    },
  },
};
