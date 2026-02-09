# Database ER Diagram

```mermaid
erDiagram
    users_table {
        integer id PK
        text first_name
        text last_name
        text email UK
        text password_hash
        text role
        text created_at
        text updated_at
    }

    session_table {
        integer id PK
        integer expires_at
        integer user_id FK
    }

    products_table {
        integer id PK
        text name
        text description
        integer price_in_paisa
        text category
        integer is_active
        text created_at
        text updated_at
    }

    orders_table {
        integer id PK
        integer user_id FK
        text status
        integer total_amount_in_paisa
        text created_at
        text updated_at
    }

    order_items_table {
        integer id PK
        integer order_id FK
        integer product_id FK
        integer quantity
        integer price_in_paisa
    }

    users_table ||--o{ session_table : "has many"
    users_table ||--o{ orders_table : "places"
    orders_table ||--o{ order_items_table : "contains"
    products_table ||--o{ order_items_table : "included in"
```

## Tables

### users_table

- **id**: Primary key
- **first_name**: User's first name
- **last_name**: User's last name
- **email**: Unique email address
- **password_hash**: Hashed password
- **role**: User role (user/admin)
- **created_at**: Timestamp of creation
- **updated_at**: Timestamp of last update

### session_table

- **id**: Primary key
- **expires_at**: Session expiration timestamp
- **user_id**: Foreign key to users_table

### products_table

- **id**: Primary key
- **name**: Product name
- **description**: Product description
- **price_in_paisa**: Price in paisa (Indian currency subunit)
- **category**: Product category
- **is_active**: Boolean flag for active status
- **created_at**: Timestamp of creation
- **updated_at**: Timestamp of last update

### orders_table

- **id**: Primary key
- **user_id**: Foreign key to users_table
- **status**: Order status (pending, active, draft, out_of_stock, archived, rejected)
- **total_amount_in_paisa**: Total order amount in paisa
- **created_at**: Timestamp of creation
- **updated_at**: Timestamp of last update

### order_items_table

- **id**: Primary key
- **order_id**: Foreign key to orders_table
- **product_id**: Foreign key to products_table
- **quantity**: Number of items (must be > 0)
- **price_in_paisa**: Price at time of order in paisa

## Relationships

- **users_table → session_table**: One-to-Many (a user can have multiple sessions)
- **users_table → orders_table**: One-to-Many (a user can place multiple orders)
- **orders_table → order_items_table**: One-to-Many (an order can have multiple items)
- **products_table → order_items_table**: One-to-Many (a product can appear
  in multiple order items)
