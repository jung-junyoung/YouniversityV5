// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false

    // Add the Google services classpath dependency here
    // Make sure to check for the latest version of the google-services plugin
    id("com.google.gms.google-services") version "4.4.1" apply false
}