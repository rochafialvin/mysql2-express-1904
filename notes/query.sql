create table transaction(
    id int auto_increment primary key,
    invoice varchar(100) not null,
    address varchar(100) not null,
    courier enum('jne', 'tiki') not null,
);

create table detailTransaction(
    id int auto_increment primary key,
    transaction_id int not null,
    name varchar(100) not null,
    quantity int not null,
    price int not null,
    CONSTRAINT fk_transaction_id FOREIGN KEY (transaction_id)
    REFERENCES transaction(id) on update cascade on delete restrict
);