use std::collections::{HashMap, VecDeque};

use quickxml_to_serde::Config;
use serde::{Deserialize, Serialize};

use crate::ENDPOINT;

pub struct Fetcher {
    revision_url: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct File {
    pub filename: String,
    pub size: i64,
    pub header_size: i64,
    pub compressed_header_size: i64,
    pub crc: i64,
    pub header_crc: i64,
}

impl Fetcher {
    pub fn new(revision: String) -> Self {
        Self {
            revision_url: format!("{ENDPOINT}/{revision}"),
        }
    }

    pub async fn fetch_filelist(&self) -> VecDeque<File> {
        if let Ok(res) = request_file(&self.revision_url).await {
            let xml_text = res.text().await.unwrap_or(String::new());

            let json = quickxml_to_serde::xml_string_to_json(xml_text, &Config::new_with_defaults())
                .unwrap()
                .to_string();

            let files = serde_json::from_str::<LatestFiles>(json.as_str()).expect("Could not parse JSON");

            let mut wad_files = VecDeque::new();

            files.latest_file_list.iter().for_each(|(_, v)| match &v.record {
                RecordUnion::PurpleRecord(r) => {
                    if r.src_file_name.is_some() {
                        let filename = r.src_file_name.as_ref().unwrap().value.as_ref().unwrap();
                        let size = r.size.as_ref().unwrap().value;
                        let header_size = r.header_size.as_ref().unwrap().value;
                        let compressed_header_size = r.compressed_header_size.as_ref().unwrap().value;
                        let crc = r.crc.as_ref().unwrap().value;
                        let header_crc = r.header_crc.as_ref().unwrap().value;

                        wad_files.push_back(File {
                            filename: filename.clone(),
                            size,
                            header_size,
                            compressed_header_size,
                            crc,
                            header_crc,
                        });
                    }
                }
                _ => {}
            });

            wad_files
        } else {
            panic!("Could not request LatestFileList.xml from {ENDPOINT}");
        }
    }
}

async fn request_file<T>(url: T) -> Result<reqwest::Response, reqwest::Error>
where
    T: AsRef<str>,
{
    let client = reqwest::Client::new();
    let res = client.get(url.as_ref()).header("User-Agent", "KingsIsle Patcher");

    res.send().await
}

//? I'm Crazy HAHAHAHA 🥰😎🤓🤠😩
#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "PascalCase")]
pub struct LatestFiles {
    latest_file_list: HashMap<String, LatestFileList>,
}

//? Crazy?
#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub struct LatestFileList {
    record: RecordUnion,
}

//? I was crazy once.
#[derive(Debug, Deserialize, Serialize)]
#[serde(untagged)]
pub enum RecordUnion {
    PurpleRecord(PurpleRecord),
    RecordElementArray(Vec<RecordElement>),
}

//? The locked me in a room.
#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "PascalCase")]
pub struct RecordElement {
    #[serde(rename = "CRC")]
    crc: Option<Crc>,
    compressed_header_size: Option<Crc>,
    file_type: Option<Crc>,
    #[serde(rename = "HeaderCRC")]
    header_crc: Option<Crc>,
    header_size: Option<Crc>,
    size: Option<Crc>,
    src_file_name: Option<Name>,
    tar_file_name: Option<Name>,
    name: Option<Name>,
}

//? A rubber room.
#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize)]
pub struct Crc {
    #[serde(rename = "#text")]
    value: i64,
    #[serde(rename = "@TYPE")]
    type_: CrcType,
}

//? A rubber room with rats.
#[derive(Debug, Deserialize, Serialize)]
pub enum CrcType {
    #[serde(rename = "UINT")]
    Uint,
}

//? And rats make me crazy.
#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize)]
pub struct Name {
    #[serde(rename = "#text")]
    value: Option<String>,
    #[serde(rename = "@TYPE")]
    type_: SrcFileNameType,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum SrcFileNameType {
    #[serde(rename = "STR")]
    Str,
}

//? Crazy?
#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "PascalCase")]
pub struct PurpleRecord {
    version: Option<Crc>,
    #[serde(rename = "CRC")]
    crc: Option<Crc>,
    compressed_header_size: Option<Crc>,
    file_type: Option<Crc>,
    #[serde(rename = "HeaderCRC")]
    header_crc: Option<Crc>,
    header_size: Option<Crc>,
    size: Option<Crc>,
    src_file_name: Option<Name>,
    tar_file_name: Option<TarFileName>,
}

//? I was crazy once.
#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize)]
pub struct TarFileName {
    #[serde(rename = "@TYPE")]
    tar_file_name_type: SrcFileNameType,
}
