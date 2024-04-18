// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::VecDeque;

use downloader::fetch_revisions;
use fetcher::{Fetcher, File, LatestFiles};
use tauri::{generate_handler, Window};

pub mod downloader;
pub mod fetcher;

pub const ENDPOINT: &str = "http://phill030.de:12369/patcher";

#[tauri::command]
async fn get_revisions() -> Vec<String> {
    let revisions = fetch_revisions(format!("{ENDPOINT}/revisions")).await.unwrap();

    revisions
}

// TODO: Use https://github.com/oscartbeaumont/tauri-specta (https://github.com/tauri-apps/tauri/issues/1514)
#[tauri::command]
async fn fetch_files(revision: String) -> String {
    let fetcher = Fetcher::new(revision);
    let file_list = fetcher.fetch_filelist().await;

    serde_json::to_string(&file_list).unwrap()
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![get_revisions, fetch_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
