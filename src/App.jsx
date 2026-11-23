import { useEffect, useState } from "react";
import Card from "./components/Card";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import logo from "./assets/Logo2.png";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("IsLogin") == "true",
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [patients, setPatients] = useState(() => {
    return JSON.parse(localStorage.getItem("patients")) || [];
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kontak, setKontak] = useState("");

  const semuaGambar = import.meta.glob("/src/assets/**/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  });
  const getGambar = (namafile) => {
    return (
      semuaGambar[`/src/assets/GambarHome/${namafile}`] ||
      semuaGambar[`/src/assets/GambarAbout/${namafile}`]
    );
  };
  const cardData = [
    {
      id: 1,
      title: "Layanan Rawat Inap",
      image: getGambar("Ranap.jpg"),
      description: "Informasi Layanan Rawat Inap",
    },
    {
      id: 2,
      title: "Layanan Rawat Jalan",
      image: getGambar("Rajal.jpg"),
      description: "Informasi Layanan Rawat Jalan",
    },
    {
      id: 3,
      title: "Layanan Farmasi",
      image: getGambar("Farmasi.jpg"),
      description: "Informasi Layanan Farmasi",
    },
  ];
  const cardaboutData = [
    {
      id: 1,
      title: "Sejarah Rumah Sakit Panti Rapih Yogyakarta:",
      image: getGambar("About.jpg"),
      description:
        "Berawal dari misi pelayanan Katolik Romo Frans van Lith, SJ dan Romo Frans Strater, SJ sejak tahun 1914, Gereja Yogyakarta bersama Kongregasi Suster Carolus Borromeus (CB) dan dukungan dana keluarga Schmutzer membangun rumah sakit bernama Onder de Bogen. Pembangunannya dimulai pada 17 September 1928, diberkati pada 24 Agustus 1929, dan diresmikan oleh Sri Sultan Hamengku Buwono VIII pada 14 September 1929. Saat pendudukan Jepang (1943), namanya diubah oleh Mgr. Soegijapranata, SJ menjadi RS Panti Rapih dan sempat dijadikan rumah sakit militer sebelum akhirnya kembali ke pengelola asli. Hingga kini, RS Panti Rapih terus melayani seluruh lapisan masyarakat tanpa diskriminasi.",
    },
    {
      id: 2,
      title: "Direksi Rumah Sakit Panti Rapih Yogyakarta:",
      image: getGambar("Direksi.jpg"),
      description: `Direktur Utama : dr. Stephani Maria Nainggolan, M.Kes.
      Direktur Medis : dr. Esdras Ardi Pramudita, DFIDN., M.Sc., MHPM., Sp.N, FAAN.
      Direktur Keperawatan : Sr. Constansia Sri Hardjanti CB, M.Kep.Ns.
      Direktur SDM dan Umum : dr. Dion Sulistyo, M.P.H.`,
    },
  ];

  function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username dan password wajib diisi");
      return;
    }
    if (username === "admin" && password === "123123") {
      localStorage.setItem("IsLogin", "true");
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    } else {
      alert("Username atau password salah");
      setPassword("");
    }
  }

  function handleTambah(e) {
    e.preventDefault();

    if (!nama.trim() || !alamat.trim() || !kontak.trim()) {
      alert("Nama, alamat, dan kontak wajib diisi");
      return;
    }
    if (!/^[0-9()+-]+$/.test(kontak.trim())) {
      alert("Kontak hanya berisi angka, tanda kurung, +, dan -");
      return;
    }
    const newPatient = {
      id: Date.now(),
      nama: nama.trim(),
      alamat: alamat.trim(),
      kontak: kontak.trim(),
    };
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    setNama("");
    setAlamat("");
    setKontak("");
  }
  function handleDelete(id) {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id),
    );
  }

  function handleLogout() {
    localStorage.removeItem("IsLogin");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    navigate("/");
  }

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            placeholder="masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Logo Panti Rapih" className="navbar-logo" />
          <h2>PANTI RAPIH</h2>
        </div>
        <div className="navbar-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/pasien">Pasien</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="card-container">
                {cardData.map((item) => (
                  <Card
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    description={item.description}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="about-container">
                <h2>Tentang Kami</h2>
                <div className="card-container-about">
                  {cardaboutData.map((item) => (
                    <Card
                      key={item.id}
                      title={item.title}
                      image={item.image}
                      description={item.description}
                    />
                  ))}
                </div>
              </div>
            }
          />
          <Route
            path="/pasien"
            element={
              <div className="pasien-page">
                <form className="pasien-form" onSubmit={handleTambah}>
                  <input
                    type="text"
                    placeholder="Masukan Nama "
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Masukan Alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Masukan Nomor HP"
                    value={kontak}
                    onChange={(e) => setKontak(e.target.value)}
                  />
                  <button type="submit" className="add-button">
                    Tambah
                  </button>
                </form>
                <table className="pasien-table">
                  <thead>
                    <tr>
                      <th>PASIEN</th>
                      <th>ALAMAT</th>
                      <th>KONTAK</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.length > 0 ? (
                      patients.map((patient) => (
                        <tr key={patient.id}>
                          <td>{patient.nama}</td>
                          <td>{patient.alamat}</td>
                          <td>{patient.kontak}</td>
                          <td>
                            <button
                              className="delete-button"
                              type="button"
                              onClick={() => handleDelete(patient.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="empty-data">
                          Belum ada data pasien.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
          />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2026 Panti Rapih.</p>
      </footer>
    </div>
  );
}
export default App;
