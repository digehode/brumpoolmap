import csv


reader = csv.reader(open('./UV670301_170_GeoPolicy_WMID_OA_simple.csv'), delimiter=',', quotechar='"')

code_col=10
agg_columns=[13,14,15,16,17,18]
agg_headers={13:"DATA_VALUE All",14:"DATA_VALUE NoC",15:"DATA_VALUE 1",16:"DATA_VALUE 2",17:"DATA_VALUE 3",18:"DATA_VALUE 4"}
data={}

rowcount=0
for row in reader:
    if rowcount!=0:        
        code=row[code_col]
        codeA=code[:-4]
        if not data.has_key(codeA):
            data[codeA]={}
            for i in agg_columns:
                data[codeA][i]=0
        for i in agg_columns:
            data[codeA][i]+=int(row[i])
        
            
    rowcount+=1


print "CODE"+"".join([","+agg_headers[x] for x in agg_columns])
for i in data:
    s=i
    for j in agg_columns:
        s+= ",%d"%data[i][j]
    print s
