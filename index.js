lucide.createIcons();

function zakatCalculator() {
	return {
		jumlahOrang: 1,
		opsiUangTunai: 'fixed',
		hargaBeras: null,
		satuanHarga: 'kg',
		tarifFixed: 45000,
		kgPerSok: 2.75,
		literPerKg: 1.219512,

		totalKg() {
			return (this.jumlahOrang > 0 ? this.jumlahOrang : 0) * this.kgPerSok;
		},

		totalLiter() {
			return this.totalKg() * this.literPerKg;
		},

		totalRupiah() {
			if (this.opsiUangTunai === 'fixed') {
				return (this.jumlahOrang > 0 ? this.jumlahOrang : 0) * this.tarifFixed;
			} else {
				const harga = parseFloat(this.hargaBeras) || 0;
				if (this.satuanHarga === 'kg') {
					return this.totalKg() * harga;
				} else {
					return this.totalLiter() * harga;
				}
			}
		},

		formatNumber(value) {
			if (value % 1 === 0) return value.toString();
			return value.toLocaleString('id-ID', {
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			});
		},

		formatRupiah(value) {
			return value.toLocaleString('id-ID', {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			});
		},

		init() {
			fetch('DB.json')
				.then((response) => response.json())
				.then((data) => {
					this.tarifFixed = data.standardRate;
				})
				.catch((error) => console.error('Gagal memuat config:', error));

			this.$watch('jumlahOrang', (value) => {
				if (value < 1 && value !== '') {
					this.jumlahOrang = 1;
				}
			});
		},
	};
}

tailwind.config = {
	theme: {
		extend: {
			colors: {
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					900: '#064e3b',
				},
			},
		},
	},
};
