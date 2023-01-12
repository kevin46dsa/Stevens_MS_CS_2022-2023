# Name : Kevin Dsa
# CWID : 20009000
# HW   : HW09_SVM

rm(list=ls())
library(e1071)

# Loading CSV 

Data <- read.csv('/Users/kevindsa/Documents/wisc_bc_ContinuousVar.csv',header=TRUE, sep=",")
head(Data, n=10)
summary(Data)

# Removing the first column since it is ID
Data = Data[,-1]
head(Data, n=10)


# Removing any NA values
Data<-na.omit(Data)
summary(Data)


#Splitting Dataset into Training and test
index <- sample(nrow(Data),as.integer(.70*nrow(Data)))
train_data<-Data[index,]
test_data<-Data[-index,]


#Factorizing
train_data$diagnosis <- factor(train_data$diagnosis)
test_data$diagnosis <- factor(test_data$diagnosis)

#SVM model building

svm.model <- svm( diagnosis~ ., data = train_data  )
print(svm.model)
svm.pred <- predict(svm.model, test_data )

# Tabulate diagnosis against svm pred
diagnosisTest= test_data[,1]
table(actual=diagnosisTest,svm.pred )

#Getting error rate
SVM_wrong<- (test_data$diagnosis!=svm.pred)
errorRate<-sum(SVM_wrong)/length(SVM_wrong)
errorRate

#calculating accuracy
accuracy = 1-errorRate
accuracy

