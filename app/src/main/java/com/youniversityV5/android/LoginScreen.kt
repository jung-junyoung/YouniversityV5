package com.youniversityV5.android // Correct package name

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.* // Keep this import
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.youniversityV5.android.ui.theme.YouniversityV5Theme // Import your theme

// --- Changes for State Lifting ---
// 1. Removed the internal remember states for email/password
// 2. Added parameters to receive email, password, and functions to call when they change
@Composable
fun LoginScreen(
    emailValue: String, // Receive email value from parent
    passwordValue: String, // Receive password value from parent
    onEmailChange: (String) -> Unit, // Function to call when email changes
    onPasswordChange: (String) -> Unit, // Function to call when password changes
    onLoginClick: () -> Unit,
    onNavigateToSignUp: () -> Unit
) {
    // Column arranges elements vertically (Layout code remains the same)
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Login", style = MaterialTheme.typography.headlineMedium)

        Spacer(modifier = Modifier.height(16.dp))

        // Email Input Field - Uses parameters now
        OutlinedTextField(
            value = emailValue,             // Use passed-in value
            onValueChange = onEmailChange, // Call passed-in function on change
            label = { Text("Email") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Password Input Field - Uses parameters now
        OutlinedTextField(
            value = passwordValue,           // Use passed-in value
            onValueChange = onPasswordChange, // Call passed-in function on change
            label = { Text("Password") },
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Login Button - onClick logic remains handled by parent
        Button(
            onClick = onLoginClick,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Login")
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Text button to navigate to Sign Up - onClick logic remains handled by parent
        TextButton(onClick = onNavigateToSignUp) {
            Text("Don't have an account? Sign Up")
        }
    }
}

// Update Preview to provide dummy state for the new parameters
@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
    // Wrap preview in your theme for better accuracy
    YouniversityV5Theme { // Use your actual theme name
        var previewEmail by remember { mutableStateOf("test@example.com") }
        var previewPassword by remember { mutableStateOf("password") }

        LoginScreen(
            emailValue = previewEmail,
            passwordValue = previewPassword,
            onEmailChange = { previewEmail = it }, // Simulate state change in preview
            onPasswordChange = { previewPassword = it }, // Simulate state change in preview
            onLoginClick = {},
            onNavigateToSignUp = {}
        )
    }
}