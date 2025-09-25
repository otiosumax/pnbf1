

``` mermaid
erDiagram
Пользователь {
int id PK
string name
string email
string password_hash
string role
datetime created_at
}

Проeкт {
int id PK
string title
string description
int owner_id FK
datetime start_date
datetime end_date
}

Дефект {
int id PK
int project_id FK
string title
string description
string priority
string status
int assignee_id FK
int created_by FK
datetime due_date
datetime created_at
datetime updated_at
}
  
Приложение {
int id PK
int defect_id FK
string filename
string url
int uploaded_by FK
datetime uploaded_at
}
  
Комментарий {
int id PK
int defect_id FK
int author_id FK
string text
datetime created_at
}
  
Лог {
int id PK
string entity
int entity_id
string action
int user_id FK
string details
datetime timestamp
}
  
Пользователь ||--o{ Проeкт : "owns"
Проeкт ||--o{ Дефект : "has"
Пользователь ||--o{ Дефект : "creates"
Пользователь ||--o{ Дефект : "assigned_to"
Дефект ||--o{ Приложение : "has"
Дефект ||--o{ Комментарий : "has"
Пользователь ||--o{ Комментарий : "writes"
Пользователь ||--o{ Приложение : "uploads"
Пользователь ||--o{ Лог : "generates"
```