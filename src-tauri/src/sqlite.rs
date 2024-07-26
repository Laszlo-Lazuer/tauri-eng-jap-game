use tauri::State;
use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

#[tauri::command]
async fn initialize_database(db: State<'_, TauriSql>) -> Result<(), String> {
    db.run(
        Migration::new(
            "initialize",
            MigrationKind::Up,
            vec![
                r#"CREATE TABLE IF NOT EXISTS scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    score INTEGER NOT NULL,
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
                );"#
                .into(),
            ],
        )
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn save_score(db: State<'_, TauriSql>, score: i32) -> Result<(), String> {
    db.execute(
        "INSERT INTO scores (score) VALUES (?1)",
        &[&score],
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn get_scores(db: State<'_, TauriSql>) -> Result<Vec<(i32, String)>, String> {
    let scores = db
        .query("SELECT score, date FROM scores", &[])
        .await
        .map_err(|e| e.to_string())?;

    Ok(scores
        .into_iter()
        .map(|row| {
            (
                row.get::<i32, _>(0),
                row.get::<String, _>(1),
            )
        })
        .collect())
}