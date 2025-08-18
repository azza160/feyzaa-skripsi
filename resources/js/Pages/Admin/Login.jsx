import React, { useState } from "react";
import { router } from '@inertiajs/react';

const AdminLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		router.post(route('admin.login'), { email, password }, {
			onError: (errors) => {
				setError(errors.message || "Login gagal");
			}
		});
	};

	return (
		<div style={{ maxWidth: 400, margin: "80px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
			<h2 style={{ textAlign: "center", marginBottom: 24 }}>Login Admin</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 16 }}>
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						style={{ width: "100%", padding: 8, marginTop: 4 }}
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						style={{ width: "100%", padding: 8, marginTop: 4 }}
					/>
				</div>
				{error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
				<button type="submit" style={{ width: "100%", padding: 10, background: "#2563eb", color: "#fff", border: "none", borderRadius: 4 }}>Login</button>
			</form>
		</div>
	);
};

export default AdminLogin;
