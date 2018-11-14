def heapHelp(arr, n, i): 
    largest = i 
    left = 2 * i + 1     # left = 2*i + 1 
    right = 2 * i + 2     # right = 2*i + 2 
  
    if left < n and arr[i] < arr[left]: 
        largest = left 
   
    if right < n and arr[largest] < arr[right]: 
        largest = right 
  
    if largest != i: 
        arr[i],arr[largest] = arr[largest],arr[i] 
   
        heapHelp(arr, n, largest) 
  

def heapSort(arr): 
    n = len(arr) 
  
    for i in range(n, -1, -1): 
        heapHelp(arr, n, i) 
  
    for i in range(n-1, 0, -1): 
        arr[i], arr[0] = arr[0], arr[i]  
        heapHelp(arr, i, 0) 
  
arr = [ 7,8,9,4,2,78,1,6,5] 
heapSort(arr) 
n = len(arr) 

for i in range(n): 
    print ("%d" %arr[i]), 



