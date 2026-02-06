async function testLogin() {
    const loginData = {
        email: "admin@gmail.com",
        password: "admin@123",
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/sign-in/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000"
            },
            body: JSON.stringify(loginData),
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Response Data:", data);
    } catch (error) {
        console.error("Login test failed:", error);
    }
}

testLogin();
