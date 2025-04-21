package com.youniversityV5.android // Correct package name

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.EditNote // Icon for Report
import androidx.compose.material.icons.filled.Home // Icon for Home
import androidx.compose.material.icons.filled.Person // Icon for MyPage
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar // Use NavigationBar from Material 3
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState

// Sealed class to define navigation items (better than just strings)
sealed class BottomNavItem(val route: String, val icon: ImageVector, val label: String) {
    object Home : BottomNavItem("home", Icons.Filled.Home, "Home")
    object Report : BottomNavItem("report", Icons.Filled.EditNote, "Report")
    object MyPage : BottomNavItem("mypage", Icons.Filled.Person, "My Page")
}

@Composable
fun AppBottomNavigationBar(navController: NavController) {
    // List of navigation items
    val items = listOf(
        BottomNavItem.Home,
        BottomNavItem.Report,
        BottomNavItem.MyPage
    )

    NavigationBar { // Material 3 Navigation Bar
        // Get current back stack entry to determine the current route
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route

        // Create an item for each screen in our list
        items.forEach { item ->
            NavigationBarItem(
                icon = { Icon(item.icon, contentDescription = item.label) },
                label = { Text(item.label) },
                selected = currentRoute == item.route, // Highlight if this item's route matches the current route
                onClick = {
                    // Navigate to the item's route on click
                    navController.navigate(item.route) {
                        // Pop up to the start destination of the graph to
                        // avoid building up a large stack of destinations
                        // on the back stack as users select items
                        navController.graph.startDestinationRoute?.let { route ->
                            popUpTo(route) {
                                saveState = true
                            }
                        }
                        // Avoid multiple copies of the same destination when
                        // reselecting the same item
                        launchSingleTop = true
                        // Restore state when reselecting a previously selected item
                        restoreState = true
                    }
                }
            )
        }
    }
}