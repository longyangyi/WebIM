/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 80027
Source Host           : localhost:3306
Source Database       : webim

Target Server Type    : MYSQL
Target Server Version : 80027
File Encoding         : 65001

Date: 2021-12-22 17:49:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chatgroup
-- ----------------------------
DROP TABLE IF EXISTS `chatgroup`;
CREATE TABLE `chatgroup` (
  `groupid` varchar(20) NOT NULL,
  `groupname` varchar(20) NOT NULL,
  PRIMARY KEY (`groupid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of chatgroup
-- ----------------------------

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `uid1` varchar(20) NOT NULL,
  `uid2` varchar(20) NOT NULL,
  `uname1` varchar(20) NOT NULL,
  `uname2` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES ('yi2', 'yi', '易龙杨二号', '易龙杨');
INSERT INTO `friend` VALUES ('yi3', 'yi', '易龙杨三号', '易龙杨');
INSERT INTO `friend` VALUES ('yi4', 'yi', '易龙杨四号', '易龙杨');
INSERT INTO `friend` VALUES ('yi', 'yi5', '易龙杨', '五号');
INSERT INTO `friend` VALUES ('uid', 'yi', '这就是昵称', '易龙杨');
INSERT INTO `friend` VALUES ('yi6', 'yi', '六子', '易龙杨');
INSERT INTO `friend` VALUES ('yi', 'cjs', '易龙杨', '梦在燃烧');
INSERT INTO `friend` VALUES ('zhouyingnan', 'yi', '侯亮平', '易龙杨');
INSERT INTO `friend` VALUES ('cjs', 'zhouyingnan', '梦在燃烧', '侯亮平');
INSERT INTO `friend` VALUES ('qingbai', 'zhouyingnan', 'qingbai', '侯亮平');
INSERT INTO `friend` VALUES ('qingbai', 'cjs', 'qingbai', '梦在燃烧');
INSERT INTO `friend` VALUES ('我是乱起的', 'zhouyingnan', '我是乱起的', '侯亮平');
INSERT INTO `friend` VALUES ('我是乱起的', 'yi', '我是乱起的', '易龙杨');
INSERT INTO `friend` VALUES ('我是乱起的', 'cjs', '我是乱起的', '梦在燃烧');
INSERT INTO `friend` VALUES ('我是乱起的', 'qingbai', '我是乱起的', 'qingbai');
INSERT INTO `friend` VALUES ('haha', 'yi', '哈哈', '易龙杨');
INSERT INTO `friend` VALUES ('yi', 'louis', '易龙杨', '路易斯');
INSERT INTO `friend` VALUES ('louisyi', 'yi', '路易斯易', '易龙杨');

-- ----------------------------
-- Table structure for groupuser
-- ----------------------------
DROP TABLE IF EXISTS `groupuser`;
CREATE TABLE `groupuser` (
  `groupid` varchar(20) NOT NULL,
  `uid` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of groupuser
-- ----------------------------

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `uid1` varchar(20) NOT NULL,
  `uid2` varchar(20) DEFAULT NULL,
  `message` varchar(200) NOT NULL,
  `time` varchar(10) NOT NULL,
  `isimg` int DEFAULT NULL,
  `isgroup` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('uid', 'yi', '1\n', '1640077186', '0', '0');
INSERT INTO `message` VALUES ('yi', 'uid', '2\n', '1640077197', '0', '0');
INSERT INTO `message` VALUES ('uid', 'yi', 'hello\n', '1640077201', '0', '0');
INSERT INTO `message` VALUES ('uid', 'yi', './chatimage/uid_yi_1640077251.png', '1640077251', '1', '0');
INSERT INTO `message` VALUES ('yi', 'uid', './chatimage/yi_uid_1640077256.png', '1640077256', '1', '0');
INSERT INTO `message` VALUES ('uid', 'yi', '哈哈\n', '1640077261', '0', '0');
INSERT INTO `message` VALUES ('yi', 'uid', '哈喽\n', '1640077265', '0', '0');
INSERT INTO `message` VALUES ('yi2', 'yi', '和楼\n', '1640077299', '0', '0');
INSERT INTO `message` VALUES ('yi', 'yi2', '哈喽\n', '1640077304', '0', '0');
INSERT INTO `message` VALUES ('yi2', 'yi', './chatimage/yi2_yi_1640077314.png', '1640077314', '1', '0');
INSERT INTO `message` VALUES ('yi', 'yi2', './chatimage/yi_yi2_1640077330.png', '1640077330', '1', '0');
INSERT INTO `message` VALUES ('yi2', 'yi', './chatimage/yi2_yi_1640077336.png', '1640077336', '1', '0');
INSERT INTO `message` VALUES ('yi6', 'yi', 'aa\n', '1640077406', '0', '0');
INSERT INTO `message` VALUES ('yi', 'yi6', 'hello\n', '1640077413', '0', '0');
INSERT INTO `message` VALUES ('yi', 'yi6', '哈喽\n', '1640077415', '0', '0');
INSERT INTO `message` VALUES ('yi6', 'yi', './chatimage/yi6_yi_1640077420.png', '1640077420', '1', '0');
INSERT INTO `message` VALUES ('yi', 'yi6', './chatimage/yi_yi6_1640077426.png', '1640077426', '1', '0');
INSERT INTO `message` VALUES ('louis', 'yi', '1\n', '1640078588', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', '2\n', '1640078592', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', '3\n', '1640078593', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', 'hello\n', '1640078598', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', '哈喽\n', '1640078601', '0', '0');
INSERT INTO `message` VALUES ('louis', 'yi', '收到\n', '1640078606', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', './chatimage/yi_louis_1640078611.png', '1640078611', '1', '0');
INSERT INTO `message` VALUES ('louis', 'yi', './chatimage/louis_yi_1640078617.png', '1640078617', '1', '0');
INSERT INTO `message` VALUES ('louis', 'yi', './chatimage/louis_yi_1640084222.png', '1640084222', '1', '0');
INSERT INTO `message` VALUES ('yi', 'louis', '哈哈\n', '1640084227', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'yi', '我来啦\n', '1640084478', '0', '0');
INSERT INTO `message` VALUES ('yi', 'cjs', '哈喽\n', '1640084480', '0', '0');
INSERT INTO `message` VALUES ('yi', 'cjs', './chatimage/yi_cjs_1640084487.png', '1640084487', '1', '0');
INSERT INTO `message` VALUES ('cjs', 'yi', '嘿嘿嘿\n', '1640084491', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'yi', './chatimage/cjs_yi_1640084501.png', '1640084501', '1', '0');
INSERT INTO `message` VALUES ('cjs', 'zhouyingnan', 'hello\n', '1640084533', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'zhouyingnan', './chatimage/cjs_zhouyingnan_1640084550.png', '1640084550', '1', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'cjs', 'hihi\n', '1640084552', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'cjs', './chatimage/zhouyingnan_cjs_1640084569.png', '1640084569', '1', '0');
INSERT INTO `message` VALUES ('cjs', 'zhouyingnan', '嘿嘿嘿\n', '1640084570', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'zhouyingnan', '\n', '1640084571', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'zhouyingnan', './chatimage/cjs_zhouyingnan_1640084578.png', '1640084578', '1', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'cjs', '牛蛙\n', '1640084579', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'cjs', 'ajwel \n', '1640084648', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'cjs', '\n', '1640084648', '0', '0');
INSERT INTO `message` VALUES ('cjs', 'cjs', 'fsadv\n', '1640084653', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'zhouyingnan', 'hihi\n', '1640084661', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'zhouyingnan', 'niuwa\n', '1640084664', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'zhouyingnan', 'bug\n', '1640084670', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'zhouyingnan', '有bug啊\n', '1640084675', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'yi', 'hahah\n', '1640084730', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'yi', 'hahaha\n', '1640084732', '0', '0');
INSERT INTO `message` VALUES ('yi', 'cjs', '是同步的\n', '1640084739', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'qingbai', 'hihi\n', '1640084843', '0', '0');
INSERT INTO `message` VALUES ('zhouyingnan', 'qingbai', './chatimage/zhouyingnan_qingbai_1640084854.png', '1640084854', '1', '0');
INSERT INTO `message` VALUES ('qingbai', 'cjs', '10086\n', '1640084884', '0', '0');
INSERT INTO `message` VALUES ('qingbai', 'zhouyingnan', './chatimage/qingbai_zhouyingnan_1640084951.png', '1640084951', '1', '0');
INSERT INTO `message` VALUES ('我是乱起的', 'yi', '强啊\n', '1640085940', '0', '0');
INSERT INTO `message` VALUES ('yi', '我是乱起的', '嘿嘿\n', '1640086005', '0', '0');
INSERT INTO `message` VALUES ('yi', '我是乱起的', './chatimage/yi_我是乱起的_1640086010.png', '1640086010', '1', '0');
INSERT INTO `message` VALUES ('yi', 'haha', '\n', '1640092452', '0', '0');
INSERT INTO `message` VALUES ('yi', 'haha', 'h\n', '1640092646', '0', '0');
INSERT INTO `message` VALUES ('yi', 'haha', '\n', '1640092648', '0', '0');
INSERT INTO `message` VALUES ('yi', 'haha', 'haah\n', '1640092656', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', 'ha\n', '1640092742', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', './chatimage/haha_yi_1640092815.png', '1640092815', '1', '0');
INSERT INTO `message` VALUES ('yi', 'haha', 'haode\n', '1640092824', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', 'hello\n', '1640093801', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', './chatimage/haha_yi_1640093808.png', '1640093808', '1', '0');
INSERT INTO `message` VALUES ('yi', 'haha', '哈哈\n', '1640093813', '0', '0');
INSERT INTO `message` VALUES ('yi', 'haha', '还你一个表情包\n', '1640093821', '0', '0');
INSERT INTO `message` VALUES ('yi', 'haha', './chatimage/yi_haha_1640093826.png', '1640093826', '1', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '\n', '1640094454', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '\n', '1640094611', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '\n', '1640094699', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '\n', '1640094745', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '\n', '1640094760', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', 'a', '1640094871', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '\n', '1640094873', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '1', '1640094901', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', 'a', '1640094925', '0', '0');
INSERT INTO `message` VALUES ('haha', 'yi', '1', '1640094977', '0', '0');
INSERT INTO `message` VALUES ('louis', 'yi', 'ha', '1640094995', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', 'hei', '1640095002', '0', '0');
INSERT INTO `message` VALUES ('yi', 'louis', 'heihei', '1640095004', '0', '0');
INSERT INTO `message` VALUES ('louis', 'yi', './chatimage/louis_yi_1640095011.png', '1640095011', '1', '0');
INSERT INTO `message` VALUES ('yi', 'louis', './chatimage/yi_louis_1640095017.png', '1640095017', '1', '0');
INSERT INTO `message` VALUES ('yi', 'louis', 'hello', '1640139974', '0', '0');
INSERT INTO `message` VALUES ('louis', 'yi', './chatimage/louis_yi_1640139984.png', '1640139984', '1', '0');
INSERT INTO `message` VALUES ('yi', 'louisyi', 'h', '1640143776', '0', '0');
INSERT INTO `message` VALUES ('louisyi', 'yi', 'hello', '1640143782', '0', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `ustate` varchar(20) NOT NULL,
  `token` varchar(64) DEFAULT NULL,
  `tokenend` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('cjs', 'cui10086', '梦在燃烧', '1', 'iUvnHyTbF4goZKvjnFFtiKsW4pTet31Z1d7mNmW4QvMprguEPIvaQXDThpvvHu5D', '1640171209');
INSERT INTO `user` VALUES ('haha', '123456', '哈哈', '0', null, null);
INSERT INTO `user` VALUES ('louis', '123456', '路易斯', '1', '6UannUB44xiPRSwNy4mip0Ia8468lPNlvH1Su83GbQjwpwyPNEDSt4JXz6Nf4sJB', '1640226354');
INSERT INTO `user` VALUES ('louisyi', '123456', '路易斯易', '1', 'A19o73lzQuhsOXie0wZhhjqJdIrkasDb6UFLJfeJuwBV5LOqHyAaOgIRNaUouvRB', '1640230157');
INSERT INTO `user` VALUES ('qingbai', 'XYH011435', 'qingbai', '1', 'n8iwhMJ6C6M7cME1juVDN85XG1Lr8Vpmn8SdKOOoN6auJsaB1cBpRdbhtlKewyjx', '1640171240');
INSERT INTO `user` VALUES ('uid', '123456', '这就是昵称', '0', null, null);
INSERT INTO `user` VALUES ('yi', '123456', '易龙杨', '0', null, null);
INSERT INTO `user` VALUES ('yi2', '123456', '易龙杨二号', '0', null, null);
INSERT INTO `user` VALUES ('yi3', '123456', '易龙杨三号', '0', null, null);
INSERT INTO `user` VALUES ('yi4', '123456', '易龙杨四号', '0', null, null);
INSERT INTO `user` VALUES ('yi5', '123456', '五号', '0', null, null);
INSERT INTO `user` VALUES ('yi6', '123456', '六子', '0', null, null);
INSERT INTO `user` VALUES ('zhouyingnan', '123456', '侯亮平', '1', 'G6kXkRkPaUMAmVr5CZ3cVLzDdOtzZ45EBseE4mEjF6CXKxtnsux3zAlki34k6fFo', '1640171373');
INSERT INTO `user` VALUES ('我是乱起的', '123456', '我是乱起的', '1', 'DOaLXIHrm6nTaTsK5jOHphnQgOXdjlJBupp6iirNp71HchMovqlCY3KGIAdhky3q', '1640172253');
