use reqwest::{Client, IntoUrl};

pub async fn fetch_revisions<F: IntoUrl>(url: F) -> Result<Vec<String>, reqwest::Error>
where
    F: reqwest::IntoUrl,
{
    let client = Client::new();
    let response = client
        .get(url)
        .header("User-Agent", "KingsIsle Patcher")
        .send()
        .await?;

    let response = response.text().await?;
    let revisions: Vec<String> = serde_json::from_str(&response).unwrap();

    Ok(revisions)
}
