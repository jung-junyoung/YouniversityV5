package com.youniversityV5.android // Correct package name

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold // Import Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost // Import NavHost
import androidx.navigation.compose.composable // Import composable
import androidx.navigation.compose.rememberNavController // Import rememberNavController

@Composable
fun MainAppScaffold() {
    // Create a NavController instance to handle navigation within the main app
    val navController = rememberNavController()

    Scaffold(
        // Set the bottom bar to the AppBottomNavigationBar we created
        bottomBar = { AppBottomNavigationBar(navController = navController) }
    ) { innerPadding -> // Content area provided by Scaffold
        // NavHost defines the navigation graph
        NavHost(
            navController = navController,
            // Set the starting screen (route) when the scaffold loads
            startDestination = BottomNavItem.Home.route,
            // Apply padding provided by Scaffold to avoid content overlapping the bars
            modifier = Modifier.padding(innerPadding)
        ) {
            // Define the composable (screen) for the "home" route
            composable(BottomNavItem.Home.route) {
                HomeScreen() // Show the HomeScreen placeholder
            }
            // Define the composable for the "report" route
            composable(BottomNavItem.Report.route) {
                ReportScreen() // Show the ReportScreen placeholder
            }
            // Define the composable for the "mypage" route
            composable(BottomNavItem.MyPage.route) {
                MyPageScreen() // Show the MyPageScreen placeholder
            }
        }
    }
}