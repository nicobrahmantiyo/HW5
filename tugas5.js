class FormulirRegistrasi {
  constructor() {
    this.namaInput = document.getElementById('name');
    this.umurInput = document.getElementById('umur');
    this.uangsakuInput = document.getElementById('uangsaku');
    this.form = document.getElementById('formRegistrasi');
    this.errorText = document.getElementById('errorText');
    this.tableBody = document.getElementById('ListPendaftar');
    this.nomorRegistrasi = 1;
    this.totalUmur = 0;
    this.totalUangsaku = 0;

    // Menambahkan event listener ke formulir
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Mencegah pengiriman formulir
      await this.validasiForm();
    });
  }

  async validasiForm() {
    let nama = this.namaInput.value;
    let umur = parseInt(this.umurInput.value);
    let uangsaku = parseInt(this.uangsakuInput.value);

    if (nama.length < 10) {
      await this.showError('Nama harus minimal 10 karakter.');
      return;
    }

    if (umur < 25) {
      await this.showError('Umur harus minimal 25 tahun.');
      return;
    }

    if (uangsaku < 100000 || uangsaku > 1000000) {
      await this.showError('Uang saku harus antara 100 ribu hingga 1 juta.');
      return;
    }

    this.tambahkanDataKeTabel(this.nomorRegistrasi, nama, umur, uangsaku);
    this.updateRataRata(umur, uangsaku);
    this.resetForm();
    this.showSuccess('Registrasi berhasil!');
    this.nomorRegistrasi++;
  }

  async showError(message) {
    this.errorText.textContent = message;
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Tunggu 3 detik
    this.errorText.textContent = '';
  }

  showSuccess(message) {
    this.errorText.textContent = '';
    alert(message);
  }

  idPendaftar() {}

  tambahkanDataKeTabel(nomorRegistrasi, nama, umur, uangsaku) {
    let newRow = this.tableBody.insertRow(this.tableBody.rows.length);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);

    cell1.innerHTML = nomorRegistrasi;
    cell2.innerHTML = nama;
    cell3.innerHTML = umur;
    cell4.innerHTML = uangsaku;
  }

  updateRataRata(umur, uangsaku) {
    this.totalUmur += umur;
    this.totalUangsaku += uangsaku;

    const averageUmur = this.totalUmur / this.nomorRegistrasi;
    const averageUangsaku = this.totalUangsaku / this.nomorRegistrasi;

    document.getElementById('avgUmur').textContent = averageUmur.toFixed(2);
    document.getElementById('avgUangsaku').textContent = averageUangsaku.toFixed(2);
  }

  resetForm() {
    this.form.reset();
  }
}

// Membuat objek FormulirRegistrasi
const formulirRegistrasi = new FormulirRegistrasi();
