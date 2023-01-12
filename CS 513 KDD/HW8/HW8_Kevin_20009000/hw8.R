# Name : Kevin Dsa
# CWID : 20009000
# HW   : HW_08_Cluster


rm(list=ls())
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

Data2<-dist(Data[,-1])
final<-hclust(Data2)
plot(final)
Data3<-cutree(final,2)
table(Data3,Data[,1])

rm(list=ls())



# KNN

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

kmodel<- kmeans(Data[,-1],2,nstart = 10)
table(kmodel$cluster,Data[,1])
