# CS 513 -KDD  
# Home Work 3 - KNN

# Course      : CS 513
# First Name  : Kevin
# Last Name   : Dsa
# CWID        : 20009000


rm(list=ls())
library(class)
csvFile <-file.choose()
cancerData <- read.csv(csvFile)
summary(cancerData)

cancerData[cancerData == '?'] <- NA
# Summary of F6 is missing as it has non numeric character
cancerData$F6 <- as.integer(cancerData$F6)
summary(cancerData)
cancerData <- na.omit(cancerData)

summary(cancerData)
View(cancerData)

# Now the summary of F6 is available, since the NA values of the row have been omitted.
# Class column has values 2 and 4, now converting that to the benign or malignant.
?factor
cancerData$Class<- factor(cancerData$Class , levels = c("2","4") , labels = c("benign","malignant"))
summary(cancerData)
View(cancerData)

#Dividing data into training and testing
# 70% Training Dataset
?sample
?nrow
trainIndex <- sample(1:nrow(cancerData), round(0.7 * nrow(cancerData))) 

##Normalizing the data set features
features <- as.data.frame(lapply(cancerData[,c(2,3,4,5,6,7,8,9,10)], function(x) {(x -min(x))/(max(x)-min(x))}))
View(features)
# Taking the target column 
target = cancerData['Class']

#train set
train <- features[trainIndex,] 
trainTarget <- target[trainIndex,]

##test set
test <- features[-trainIndex,] 
testTarget <- target[-trainIndex,]

## writing function to calculate accuracy
accuracy <- function(x){sum(diag(x)/(sum(rowSums(x)))) * 100}


#Building the KNN model for k = 3
?knn
clf <- knn(train,test,cl=trainTarget,k=3)

conf_matrix <- table(clf, testTarget)
print(conf_matrix)
accuracy(conf_matrix)

#Building the KNN model for k = 5
clf2 <- knn(train,test,cl=trainTarget,k=5)

conf_matrix2 <- table(clf2, testTarget)
print(conf_matrix2)
accuracy(conf_matrix2)

#Building the KNN model for k = 10
clf3 <- knn(train,test,cl=trainTarget,k=10)

conf_matrix3 <- table(clf3, testTarget)
print(conf_matrix3)
accuracy(conf_matrix3)

