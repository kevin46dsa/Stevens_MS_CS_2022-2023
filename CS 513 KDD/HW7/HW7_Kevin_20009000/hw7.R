# Name : Kevin Dsa
# CWID : 20009000
# HW   : HW_07_ANN

rm(list=ls())
#install.packages("neuralnet")
#install.packages("NeuralNetTools")
library(neuralnet)
library(NeuralNetTools)

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
View(Data)

#Splitting Dataset into Training and test
index <- sample(nrow(Data),as.integer(.70*nrow(Data)))
train_data<-Data[index,]
test_data<-Data[-index,]


# Running the model
model <- neuralnet(diagnosis~.,train_data,hidden=5, threshold=0.01)
plot(model)
plotnet(model)

pred<-compute(model ,test_data[,-1])
ann<-c('B','M')[apply(pred$net.result,1,which.max)]

inc = (test_data$diagnosis != ann)
accuracy <-1 - sum(inc)/length(inc)
accuracy

# end of code 

## test should have only the input colum
ann <-compute(net_Titanic2 , test[,-4])
str(ann)
ann$net.result 

ann_cat<-ifelse(ann$net.result <1.5,1,2)
length(ann_cat)

table(Actual=test$Survived,predition=ann_cat)

wrong<- (test$Survived!=ann_cat)
error_rate<-sum(wrong)/length(wrong)
error_rate

# need to check if the above code should be added
