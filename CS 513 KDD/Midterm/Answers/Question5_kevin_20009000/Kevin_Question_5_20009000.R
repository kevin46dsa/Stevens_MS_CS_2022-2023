# CS 513 -KDD  
# Midterm Question 5

# Course      : CS 513
# First Name  : Kevin
# Last Name   : Dsa
# CWID        : 20009000


rm(list = ls())
library(class)
# Loading CSV 
#setwd("/Users/kevindsa/Documents/Course work Stevens/KDDAssignments /Midterm")
Data <- read.csv('/Users/kevindsa/Documents/IBM_Attrition_v2B.csv',header=TRUE, sep=",")
summary(Data)
View(Data)

#Removing missing values
Data <- na.omit(Data)
summary(Data)
View(Data)

?ifelse
Data$Attrition<-ifelse(Data$Attrition=="Yes",1,0)
View(Data)

#Adding attrition column to another df

# Taking the target column 
target = Data['Attrition']

#Dropping Attrition column 
Data1 <- subset(Data, select = -c(Attrition) )
View(Data1)


#Getting training data Indexes
trainIndex <- sample(1:nrow(Data), round(0.7 * nrow(Data)))

##Train set
train <- Data1[trainIndex,] 
trainTarget <- target[trainIndex,]


##test set
test <- Data1[-trainIndex,] 
testTarget <- target[-trainIndex,]

## function to calculate accuracy
accuracy <- function(x){sum(diag(x)/(sum(rowSums(x)))) * 100}

#calculating KNN
?knn
clf <- knn(train,test,cl=trainTarget,k=3)
clf
conf_matrix <- table(clf, testTarget)
?table
print(conf_matrix)
accuracy(conf_matrix)


n = sum(conf_matrix) # number of instances
nc = nrow(conf_matrix) # number of classes
diag = diag(conf_matrix) # number of correctly classified instances per class 
rowsums = apply(conf_matrix, 1, sum) # number of instances per class
colsums = apply(conf_matrix, 2, sum) # number of predictions per class
p = rowsums / n # distribution of instances over the actual classes
q = colsums / n # distribution of instances over the predicted classes

accuracy = sum(diag) / n 
accuracy
precision = diag / colsums 
recall = diag / rowsums 
f1 = 2 * precision * recall / (precision + recall) 
data.frame(precision, recall, f1) 

