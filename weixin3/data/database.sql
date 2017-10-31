SET NAMES 'utf8';
DROP DATABASE IF EXISTS yushan;
CREATE DATABASE yushan CHARSET=UTF8;
USE yushan;
CREATE TABLE ys_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(64),
        price FLOAT(6,2),
        img_sm01 VARCHAR(64),
        img_sm02 VARCHAR(64),
        img_sm03 VARCHAR(64),
        img_lg01 VARCHAR(64),
        img_lg02 VARCHAR(64),
        img_lg03 VARCHAR(64),
        detail VARCHAR(2048),
        material VARCHAR(2048),
        pinkage VARCHAR(64)
);
INSERT INTO ys_dish(did,name,img_sm01,img_sm02,img_sm03,img_lg01,img_lg02,img_lg03,price,detail,material,pinkage) VALUES
(   null,
        '茶油',
        '主图.png',
        '1.jpg',
        '2.jpg',
        '茶油A1_07.jpg',
        '茶油A1_08.jpg',
        '茶油A1_09.jpg',
        72.00,
        '362件',
        '池州特产，中国特产，家里的味道',
        '包邮'
),
(   null,
        '生态好油',
        '2.jpg',
        'top_05.jpg',
        'top_05.png',
        '茶油A1_09.jpg',
        '茶油A1_10.jpg',
        '茶油A1_11.jpg',
        99.00,
        '359件',
        '池州特产，中国特产，家里的味道',
        '包邮'
),
(   null,
         '精品油',
         '3.jpg',
         'top_05.jpg',
         'top_05.png',
         '茶油A1_12.jpg',
         '茶油A1_13.jpg',
         '茶油A1_14.jpg',
         66.00,
         '359件',
         '池州特产，中国特产，家里的味道',
         '包邮'
),
(   null,
         '花生油',
         '4.jpg',
         'top_05.jpg',
         'top_06.jpg',
         '茶油A1_12.jpg',
         '茶油A1_13.jpg',
         '茶油A1_14.jpg',
         89.00,
         '359件',
         '池州特产，中国特产，家里的味道',
         '包邮'
),
(   null,
         '芝麻油',
         '5.jpg',
         'top_05.jpg',
         'top_06.jpg',
         '茶油A1_12.jpg',
         '茶油A1_13.jpg',
         '茶油A1_14.jpg',
         69.00,
         '359件',
         '池州特产，中国特产，家里的味道',
         '包邮'
),
(   null,
         '香油',
         'top_05.png',
         'top_05.jpg',
         'top_06.jpg',
         '茶油A1_15.jpg',
         '茶油A1_16.jpg',
         '茶油A1_17.jpg',
         120.00,
         '359件',
         '池州特产，中国特产，家里的味道',
         '包邮'
);
##SELECT * FROM ys_dish;
/*Logo*/
CREATE TABLE ys_mainLogo(
      img_logo01 VARCHAR(64),
      img_logo02 VARCHAR(64),
      img_logo03 VARCHAR(64),
      img_logo VARCHAR(64)
  );
  INSERT INTO ys_mainLogo(img_logo01,img_logo02,img_logo03,img_logo) VALUES
  (
      'top_01.png',
      'top_05.png',
      'top_04.jpg',
      'top_04.jpg'
  );
/*用户表*/
CREATE TABLE ys_users(
    userid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    uname VARCHAR(20),                     /*用户名*/
    pwd VARCHAR(20),                       /*密码*/
    phone VARCHAR(20)                      /*电话*/
);
INSERT INTO ys_users VALUES
(NULL,'mary','123456','18715119367'),
(NULL,'jerry','22222','13819196547'),
(NULL,'john','33333','13819196547');
/*订单表*/
CREATE TABLE ys_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
    userid INT,                             /*用户*/
    phone VARCHAR(16),                      /*联系电话*/
    user_name VARCHAR(16),                  /*收货方用户名*/
    order_time LONG,                        /*下单时间*/
    addr VARCHAR(256),                      /*订单地址*/
    totalprice FLOAT(6,2)                   /*订单总价*/
);
INSERT INTO ys_order VALUES
(NULL,1,'13501234567','大旭',1445154859209,'大钟寺中鼎B座',20.5),
(NULL,1,'13501257543','琳妹妹',1445154997543,'大钟寺中鼎B座',12.5),
(NULL,2,'13207654321','东东',1445254997612,'大钟寺中鼎B座',55),
(NULL,2,'13899999999','文兄',1445354959209,'大钟寺中鼎B座',35),
(NULL,3,'13683675299','梅姐',1445355889209,'大钟寺中鼎B座',45);
/**购物车表**/
CREATE TABLE ys_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
INSERT INTO ys_cart VALUES (1,1,1,1),
(2,1,2,4),
(3,1,5,2),
(4,3,2,10),
(5,3,6,1);
##SELECT * FROM ys_order;
/**订单详情表**/
CREATE TABLE kf_orderdetails(
    oid INT ,                            /*订单编号*/
    did INT,                             /*产品id*/
    dishCount INT,                     /*购买数量*/
    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
);
INSERT INTO ys_orderdetails VALUES (1,1,2,5),
(1,2,1,10.5),
(2,3,1,12.5),
(3,1,3,5),
(3,2,4,10),
(4,4,7,5),
(5,5,5,4),
(5,6,2,12.5);
