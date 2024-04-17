// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use downloader::fetch_revisions;
use tauri::{generate_handler, Window};

pub mod downloader;

const ENDPOINT: &str = "http://phill030.de:12369/patcher";

#[tauri::command]
async fn get_revisions() -> Vec<String> {
    let revisions = fetch_revisions(format!("{ENDPOINT}/revisions"))
        .await
        .unwrap();

    println!("{revisions:?}");
    revisions
}

#[tauri::command]
async fn revision_selected(revision: String, window: Window) {
    println!("Revision {revision} selected");
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .setup(|app| Ok(()))
        .invoke_handler(generate_handler![get_revisions, revision_selected])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
