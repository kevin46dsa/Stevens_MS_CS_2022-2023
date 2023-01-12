# Name : Kevin Dsa
# CWID : 20009000
# HW   : Lab4_NB


rm(list=ls())
library(e1071)


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
train_index <- sample(1:nrow(Data),as.integer(.70*nrow(Data)))
train_data<-Data[train_index,]
test_data<-Data[-train_index,]

#running the model
model <- naiveBayes(Class~., data=train_data)

prediction <- predict(model, test_data)
prediction
conf_matrix <- table(predict_nb = prediction, class = test_data$Class)
print(conf_matrix)

## writing function to calculate accuracy
accuracy <- function(x){sum(diag(x)/(sum(rowSums(x)))) * 100}
accuracy(conf_matrix)

rm(list=ls())
