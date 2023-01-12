# Name : Kevin Dsa
# CWID : 20009000
# HW   : Lab6_RF_C50

##### Part 1: C50

install.packages("C50")

rm(list=ls())
library(C50)

# Loading CSV 
Data <- read.csv('/Users/kevindsa/Documents/breast-cancer-wisconsin.csv',header=TRUE, sep=",")
head(Data, n=10)

#csvFile <-file.choose()
#Data <- read.csv(csvFile)
summary(Data)

Data[Data == '?'] <- NA
# Summary of F6 is missing as it has non numeric character
Data$F6 <- as.integer(Data$F6)
summary(Data)


Data<-na.omit(Data)
summary(Data)

#Setting factor
Data$Class <- factor(Data$Class, levels = c(2, 4), labels = c("benign", "malignant"))
Data<- Data[2:11]
class(Data$Class)

head(Data, n=10)

#Splitting Dataset into Training and test
index <- sample(nrow(Data),as.integer(.70*nrow(Data)))
train_data<-Data[index,]
test_data<-Data[-index,]


#running the model
c50<-C5.0(Class~.,train_data[,-1])
summary(c50)
plot(c50)

#Prediction
prediction<-predict(c50,test_data[,-1],type="class") 
prediction
conf_matrix<-table(test_data[,11],pred)
conf_matrix

## writing function to calculate accuracy
inc<-sum(test_data[,11]!=prediction)
accuracy<- 1 - inc/length(test_data[,11])
accuracy

rm(list=ls())





##### Part 2: Random Forest

#install.packages('randomForest')

rm(list=ls())
library('randomForest')

# Loading CSV 
Data <- read.csv('/Users/kevindsa/Documents/breast-cancer-wisconsin.csv',header=TRUE, sep=",")
head(Data, n=10)

#csvFile <-file.choose()
#Data <- read.csv(csvFile)
summary(Data)

Data[Data == '?'] <- NA
# Summary of F6 is missing as it has non numeric character
Data$F6 <- as.integer(Data$F6)
summary(Data)


Data<-na.omit(Data)
summary(Data)

#Setting factor
Data$Class <- factor(Data$Class, levels = c(2, 4), labels = c("benign", "malignant"))
Data<- Data[2:11]
class(Data$Class)

head(Data, n=10)

#Splitting Dataset into Training and test
index <- sample(nrow(Data),as.integer(.70*nrow(Data)))
train_data<-Data[index,]
test_data<-Data[-index,]

#Running the model
rf<-randomForest(Class~.,data = train_data, importance = TRUE, ntree=1000)
varImpPlot(rf)
importance(rf)

# Predction
prediction <-predict( rf ,test_data , type="class" )
prediction
inc <- sum(test_data[,10] != prediction)

## writing function to calculate accuracy
accuracy <- 1 - inc/length(test_data[,10])
accuracy

rm(list=ls())
