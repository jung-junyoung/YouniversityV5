package com.youniversityV5.android

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth // Correct import
import com.google.firebase.ktx.Firebase // Correct import
import com.youniversityV5.android.ui.theme.YouniversityV5Theme
import com.youniversityV5.android.LoginScreen
import com.youniversityV5.android.SignUpScreen
import com.youniversityV5.android.MainAppScaffold // Import the new Scaffold

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // --- Check Login Status ---
            // Get the Firebase Auth instance
            val auth: FirebaseAuth = Firebase.auth

            // Determine if the user is currently logged in
            val isLoggedIn = auth.currentUser != null // true if user is logged in, false otherwise

            YouniversityV5Theme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    // --- Show appropriate UI based on login status ---
                    if (isLoggedIn) {
                        // If logged in, show the main app scaffold
                        MainAppScaffold()
                    } else {
                        // If not logged in, show the authentication flow
                        AuthenticationNavigator()
                    }
                }
            }
        }
    }
}

// AuthenticationNavigator remains the same as before
@Composable
fun AuthenticationNavigator() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var showLoginScreen by remember { mutableStateOf(true) }
    val auth: FirebaseAuth = Firebase.auth
    val context = LocalContext.current

    fun clearFields() {
        email = ""
        password = ""
        confirmPassword = ""
    }

    if (showLoginScreen) {
        LoginScreen(
            emailValue = email,
            passwordValue = password,
            onEmailChange = { email = it },
            onPasswordChange = { password = it },
            onLoginClick = {
                if (email.isBlank() || password.isBlank()) {
                    Toast.makeText(context, "Enter Email and Password", Toast.LENGTH_SHORT).show()
                } else {
                    auth.signInWithEmailAndPassword(email.trim(), password.trim())
                        .addOnCompleteListener { task ->
                            if (task.isSuccessful) {
                                Toast.makeText(context, "Login successful!", Toast.LENGTH_SHORT).show()
                                clearFields()
                                // Login state will be re-checked on next recomposition,
                                // automatically switching to MainAppScaffold
                            } else {
                                val errorMessage = task.exception?.message ?: "Login failed."
                                Toast.makeText(context, "Login failed: $errorMessage", Toast.LENGTH_LONG).show()
                            }
                        }
                }
            },
            onNavigateToSignUp = {
                clearFields()
                showLoginScreen = false
            }
        )
    } else {
        SignUpScreen(
            emailValue = email,
            passwordValue = password,
            confirmPasswordValue = confirmPassword,
            onEmailChange = { email = it },
            onPasswordChange = { password = it },
            onConfirmPasswordChange = { confirmPassword = it },
            onSignUpClick = {
                if (email.isBlank() || password.isBlank() || confirmPassword.isBlank()) {
                    Toast.makeText(context, "Enter Email and Passsword", Toast.LENGTH_SHORT).show()
                } else if (password != confirmPassword) {
                    Toast.makeText(context, "Incorrect Password", Toast.LENGTH_SHORT).show()
                } else {
                    auth.createUserWithEmailAndPassword(email.trim(), password.trim())
                        .addOnCompleteListener { task ->
                            if (task.isSuccessful) {
                                Toast.makeText(context, "Sign up successful!", Toast.LENGTH_SHORT).show()
                                clearFields()
                                showLoginScreen = true
                            } else {
                                val errorMessage = task.exception?.message ?: "Sign up failed."
                                Toast.makeText(context, "Sign up failed: $errorMessage", Toast.LENGTH_LONG).show()
                            }
                        }
                }
            },
            onNavigateToLogin = {
                clearFields()
                showLoginScreen = true
            }
        )
    }
}