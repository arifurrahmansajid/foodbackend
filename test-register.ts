async function testRegister() {
    const registerData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000"
            },
            body: JSON.stringify(registerData),
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Response Data:", data);
    } catch (error) {
        console.error("Register test failed:", error);
    }
}

testRegister();
