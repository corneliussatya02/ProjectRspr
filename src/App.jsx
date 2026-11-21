import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("IsLogin") == "true",
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [currentPage, setCurrentPage] = useState("home");

  const [patients, setPatients] = useState(() => {
    return JSON.parse(localStorage.getItem("patients")) || [];
  });
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kontak, setKontak] = useState("");
  const semuaGambar = import.meta.glob(
    "/src/assets/GambarHome/*.{png,jpg,jpeg,webp}",
    {
      eager: true,
      import: "default",
    },
  );
  const getGambar = (namafile) =>
    semuaGambar[`/src/assets/GambarHome/${namafile}`];

  const cardData = [
    {
      id: 1,
      title: "Layanan Rawat Inap",
      image: getGambar("Ranap.jpg"),
      description: "Informasi Layanan Rawat Inap.",
    },
    {
      id: 2,
      title: "Layanan Rawat Jalan",
      image: getGambar("Rajal.jpg"),
      description: "Informasi Layanan Rawat Jalan.",
    },
    {
      id: 3,
      title: "Layanan Farmasi",
      image: getGambar("Farmasi.jpg"),
      description: "Informasi Layanan Farmasi.",
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
      localStorage.setItem("password", password);
      setIsLoggedIn(true);
    } else {
      alert("Username atau password salah");
      setPassword("");
    }
  }

  function handleHome() {
    setCurrentPage("home");
  }

  function handleAbout() {
    setCurrentPage("about");
  }

  function handlePasien() {
    setCurrentPage("pasien");
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
    {
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id),
      );
    }
  }

  function handleLogout() {
    localStorage.removeItem("IsLogin");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setCurrentPage("home");
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
        <h2>PANTI RAPIH</h2>

        <div className="navbar-menu">
          <button onClick={handleHome}>Home</button>
          <button onClick={handleAbout}>About</button>
          <button onClick={handlePasien}>Pasien</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        {currentPage === "home" && (
          <>
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
          </>
        )}

        {currentPage === "about" && (
          <>
            <h1>halaman about</h1>
            <p>selamat datang</p>
          </>
        )}
        {currentPage === "pasien" && (
          <div className="pasien-page">
            <form className="pasien-form" onSubmit={handleTambah}>
              <input
                type="text"
                placeholder="NAMA"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <input
                type="text"
                placeholder="ALAMAT"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
              <input
                type="tel"
                placeholder="KONTAK"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
              />
              {/* <input
                type="tel"
                placeholder="KONTAK"
                value={kontak}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9()+-]*$/.test(value)) setKontak(value);
                }}
              /> */}

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
        )}
      </main>
      <footer>
        <p>&copy; 2026 Panti Rapih.</p>
      </footer>
    </div>
  );
}

export default App;
