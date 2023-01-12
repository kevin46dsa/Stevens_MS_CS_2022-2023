# Name : Kevin Dsa
# CWID : 20009000
# HW   : HW_10_SOM

rm(list=ls())
set.seed(123)

#install.packages("kohonen")
library("kohonen")
?som()

# Loading CSV 

Data <- read.csv('/Users/kevindsa/Documents/wisc_bc_ContinuousVar.csv',header=TRUE, sep=",")
head(Data, n=10)
summary(Data)

# Removing the first column since it is ID
#Data = Data[,-1]
#head(Data, n=10)

# Removing any NA values
Data<-na.omit(Data)
summary(Data)

#Removing diagnosis (target)
training<-Data[-c(2)]
summary(training)

data_som<-som(as.matrix(training), grid = somgrid(2,1, topo = "hexagonal"), keep.data = TRUE,dist.fcts = "euclidean")
summary(data_som)


str(data_som)
data_som$unit.classif

table(cluster=data_som$unit.classif,Data$diagnosis)

plot(data_som,type="codes")

summary(data_som)

