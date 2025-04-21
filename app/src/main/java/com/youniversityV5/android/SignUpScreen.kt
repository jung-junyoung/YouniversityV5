package com.youniversityV5.android // Correct package name

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.* // Keep import
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.youniversityV5.android.ui.theme.YouniversityV5Theme // Import your theme

// --- Changes for State Lifting ---
// 1. Removed internal state for email, password, confirmPassword
// 2. Added parameters to receive these values and their change handlers
@Composable
fun SignUpScreen(
    emailValue: String,
    passwordValue: String,
    confirmPasswordValue: String,
    onEmailChange: (String) -> Unit,
    onPasswordChange: (String) -> Unit,
    onConfirmPasswordChange: (String) -> Unit,
    onSignUpClick: () -> Unit,
    onNavigateToLogin: () -> Unit
) {
    // Column layout remains the same
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Sign Up", style = MaterialTheme.typography.headlineMedium)

        Spacer(modifier = Modifier.height(16.dp))

        // Email Input Field - Uses parameters now
        OutlinedTextField(
            value = emailValue,             // Use passed-in value
            onValueChange = onEmailChange, // Call passed-in function
            label = { Text("Email") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Password Input Field - Uses parameters now
        OutlinedTextField(
            value = passwordValue,           // Use passed-in value
            onValueChange = onPasswordChange, // Call passed-in function
            label = { Text("Password") },
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Confirm Password Input Field - Uses parameters now
        OutlinedTextField(
            value = confirmPasswordValue,       // Use passed-in value
            onValueChange = onConfirmPasswordChange, // Call passed-in function
            label = { Text("Confirm Password") },
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Sign Up Button - onClick logic handled by parent
        Button(
            onClick = onSignUpClick,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Sign Up")
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Text button to navigate back to Login - onClick logic handled by parent
        TextButton(onClick = onNavigateToLogin) {
            Text("Already have an account? Login")
        }
    }
}

// Update Preview to provide dummy state for the new parameters
@Preview(showBackground = true)
@Composable
fun SignUpScreenPreview() {
    YouniversityV5Theme { // Use your actual theme name
        var pEmail by remember { mutableStateOf("") }
        var pPassword by remember { mutableStateOf("") }
        var pConfirmPassword by remember { mutableStateOf("") }

        SignUpScreen(
            emailValue = pEmail,
            passwordValue = pPassword,
            confirmPasswordValue = pConfirmPassword,
            onEmailChange = { pEmail = it },
            onPasswordChange = { pPassword = it },
            onConfirmPasswordChange = { pConfirmPassword = it },
            onSignUpClick = {},
            onNavigateToLogin = {}
        )
    }
}