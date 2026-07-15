export interface SortStep {
  array: number[];
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sorted: number[];
}

export interface AlgorithmInfo {
  name: string;
  description: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  code: Record<string, string>;
  sort: (arr: number[]) => Generator<SortStep>;
}

function* bubbleSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      yield { array: [...a], comparing: [j, j + 1], swapping: null, sorted: [...sorted] };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        yield { array: [...a], comparing: null, swapping: [j, j + 1], sorted: [...sorted] };
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted.push(0);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

function* selectionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { array: [...a], comparing: [minIdx, j], swapping: null, sorted: [...sorted] };
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield { array: [...a], comparing: null, swapping: [i, minIdx], sorted: [...sorted] };
    }
    sorted.push(i);
  }
  sorted.push(n - 1);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

function* insertionSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [0];
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      yield { array: [...a], comparing: [j - 1, j], swapping: null, sorted: [...sorted] };
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      yield { array: [...a], comparing: null, swapping: [j - 1, j], sorted: [...sorted] };
      j--;
    }
    sorted.push(i);
  }
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

function* mergeSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [];

  function* merge(l: number, m: number, r: number): Generator<SortStep> {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      yield { array: [...a], comparing: [l + i, m + 1 + j], swapping: null, sorted: [...sorted] };
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      yield { array: [...a], comparing: null, swapping: [k - 1, k - 1], sorted: [...sorted] };
    }
    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];
  }

  function* mergeSortHelper(l: number, r: number): Generator<SortStep> {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    yield* mergeSortHelper(l, m);
    yield* mergeSortHelper(m + 1, r);
    yield* merge(l, m, r);
    for (let i = l; i <= r; i++) sorted.push(i);
  }

  yield* mergeSortHelper(0, a.length - 1);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...Array(a.length).keys()] };
}

function* quickSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [];

  function* partition(low: number, high: number): Generator<SortStep, number> {
    const pivot = a[high];
    const pivotVal = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      yield { array: [...a], comparing: [j, high], swapping: null, sorted: [...sorted] };
      if (a[j] <= pivotVal) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        yield { array: [...a], comparing: null, swapping: [i, j], sorted: [...sorted] };
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    yield { array: [...a], comparing: null, swapping: [i + 1, high], sorted: [...sorted] };
    return i + 1;
  }

  function* quickSortHelper(low: number, high: number): Generator<SortStep> {
    if (low >= high) return;
    const pi = yield* partition(low, high);
    sorted.push(pi);
    yield* quickSortHelper(low, pi - 1);
    yield* quickSortHelper(pi + 1, high);
  }

  yield* quickSortHelper(0, a.length - 1);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...Array(a.length).keys()] };
}

function* heapSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];

  function* heapify(size: number, root: number): Generator<SortStep> {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    if (left < size) {
      yield { array: [...a], comparing: [left, largest], swapping: null, sorted: [...sorted] };
      if (a[left] > a[largest]) largest = left;
    }
    if (right < size) {
      yield { array: [...a], comparing: [right, largest], swapping: null, sorted: [...sorted] };
      if (a[right] > a[largest]) largest = right;
    }
    if (largest !== root) {
      [a[root], a[largest]] = [a[largest], a[root]];
      yield { array: [...a], comparing: null, swapping: [root, largest], sorted: [...sorted] };
      yield* heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) yield* heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    sorted.push(i);
    yield { array: [...a], comparing: null, swapping: [0, i], sorted: [...sorted] };
    yield* heapify(i, 0);
  }
  sorted.push(0);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

function* shellSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap && a[j - gap] > a[j]) {
        yield { array: [...a], comparing: [j - gap, j], swapping: null, sorted: [...sorted] };
        [a[j - gap], a[j]] = [a[j], a[j - gap]];
        yield { array: [...a], comparing: null, swapping: [j - gap, j], sorted: [...sorted] };
        j -= gap;
      }
    }
    gap = Math.floor(gap / 2);
  }
  for (let i = 0; i < n; i++) sorted.push(i);
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

function* countingSort(arr: number[]): Generator<SortStep> {
  const a = [...arr];
  const sorted: number[] = [];
  if (a.length === 0) return;
  const max = Math.max(...a);
  const min = Math.min(...a);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(a.length);
  for (let i = 0; i < a.length; i++) count[a[i] - min]++;
  for (let i = 1; i < range; i++) count[i] += count[i - 1];
  for (let i = a.length - 1; i >= 0; i--) {
    const idx = --count[a[i] - min];
    output[idx] = a[i];
  }
  for (let i = 0; i < a.length; i++) {
    a[i] = output[i];
    sorted.push(i);
    yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
  }
  yield { array: [...a], comparing: null, swapping: null, sorted: [...sorted] };
}

const bubbleCode: Record<string, string> = {
  JavaScript: `function bubbleSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}`,
  Python: `def bubble_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`,
  Java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
  Rust: `fn bubble_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n - 1 {
        let mut swapped = false;
        for j in 0..n - 1 - i {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
                swapped = true;
            }
        }
        if !swapped { break; }
    }
}`,
  "C++": `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
};

const selectionCode: Record<string, string> = {
  JavaScript: `function selectionSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a;
}`,
  Python: `def selection_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
    return a`,
  Java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int tmp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = tmp;
    }
}`,
  Rust: `fn selection_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n - 1 {
        let mut min_idx = i;
        for j in i + 1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        if min_idx != i { arr.swap(i, min_idx); }
    }
}`,
  "C++": `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
};

const insertionCode: Record<string, string> = {
  JavaScript: `function insertionSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      j--;
    }
  }
  return a;
}`,
  Python: `def insertion_sort(arr):
    a = arr.copy()
    for i in range(1, len(a)):
        j = i
        while j > 0 and a[j - 1] > a[j]:
            a[j - 1], a[j] = a[j], a[j - 1]
            j -= 1
    return a`,
  Java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            int tmp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = tmp;
            j--;
        }
    }
}`,
  Rust: `fn insertion_sort(arr: &mut [i32]) {
    for i in 1..arr.len() {
        let mut j = i;
        while j > 0 && arr[j - 1] > arr[j] {
            arr.swap(j - 1, j);
            j -= 1;
        }
    }
}`,
  "C++": `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swap(arr[j - 1], arr[j]);
            j--;
        }
    }
}`,
};

const mergeCode: Record<string, string> = {
  JavaScript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
  Python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
  Java: `public static void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
private static void merge(int[] arr, int l, int m, int r) {
    int[] left = Arrays.copyOfRange(arr, l, m + 1);
    int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}`,
  Rust: `fn merge_sort(arr: &mut [i32]) {
    if arr.len() <= 1 { return; }
    let mid = arr.len() / 2;
    let mut left = arr[..mid].to_vec();
    let mut right = arr[mid..].to_vec();
    merge_sort(&mut left);
    merge_sort(&mut right);
    let (mut i, mut j, mut k) = (0, 0, 0);
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] { arr[k] = left[i]; i += 1; }
        else { arr[k] = right[j]; j += 1; }
        k += 1;
    }
    while i < left.len() { arr[k] = left[i]; i += 1; k += 1; }
    while j < right.len() { arr[k] = right[j]; j += 1; k += 1; }
}`,
  "C++": `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
};

const quickCode: Record<string, string> = {
  JavaScript: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
  Python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
  Java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;
    return i + 1;
}`,
  Rust: `fn quick_sort(arr: &mut [i32]) {
    if arr.len() <= 1 { return; }
    let pivot = arr.len() - 1;
    let mut i = 0;
    for j in 0..pivot {
        if arr[j] <= arr[pivot] {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, pivot);
    quick_sort(&mut arr[..i]);
    quick_sort(&mut arr[i + 1..]);
}`,
  "C++": `int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
};

const heapCode: Record<string, string> = {
  JavaScript: `function heapSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(a, n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(a, i, 0);
  }
  return a;
}
function heapify(a, n, i) {
  let largest = i, left = 2 * i + 1, right = 2 * i + 2;
  if (left < n && a[left] > a[largest]) largest = left;
  if (right < n && a[right] > a[largest]) largest = right;
  if (largest !== i) {
    [a[i], a[largest]] = [a[largest], a[i]];
    heapify(a, n, largest);
  }
}`,
  Python: `def heapify(a, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and a[left] > a[largest]:
        largest = left
    if right < n and a[right] > a[largest]:
        largest = right
    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        heapify(a, n, largest)

def heap_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):
        heapify(a, n, i)
    for i in range(n - 1, 0, -1):
        a[0], a[i] = a[i], a[0]
        heapify(a, i, 0)
    return a`,
  Java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
        heapify(arr, i, 0);
    }
}
private static void heapify(int[] arr, int n, int i) {
    int largest = i, left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
        heapify(arr, n, largest);
    }
}`,
  Rust: `fn heap_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in (0..n / 2).rev() { heapify(arr, n, i); }
    for i in (1..n).rev() {
        arr.swap(0, i);
        heapify(arr, i, 0);
    }
}
fn heapify(arr: &mut [i32], n: usize, i: usize) {
    let mut largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if left < n && arr[left] > arr[largest] { largest = left; }
    if right < n && arr[right] > arr[largest] { largest = right; }
    if largest != i {
        arr.swap(i, largest);
        heapify(arr, n, largest);
    }
}`,
  "C++": `void heapify(int arr[], int n, int i) {
    int largest = i, left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
};

const shellCode: Record<string, string> = {
  JavaScript: `function shellSort(arr) {
  const a = [...arr];
  const n = a.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap && a[j - gap] > a[j]) {
        [a[j - gap], a[j]] = [a[j], a[j - gap]];
        j -= gap;
      }
    }
    gap = Math.floor(gap / 2);
  }
  return a;
}`,
  Python: `def shell_sort(arr):
    a = arr.copy()
    n = len(a)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            j = i
            while j >= gap and a[j - gap] > a[j]:
                a[j - gap], a[j] = a[j], a[j - gap]
                j -= gap
        gap //= 2
    return a`,
  Java: `public static void shellSort(int[] arr) {
    int n = arr.length;
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int j = i;
            while (j >= gap && arr[j - gap] > arr[j]) {
                int tmp = arr[j];
                arr[j] = arr[j - gap];
                arr[j - gap] = tmp;
                j -= gap;
            }
        }
    }
}`,
  Rust: `fn shell_sort(arr: &mut [i32]) {
    let n = arr.len();
    let mut gap = n / 2;
    while gap > 0 {
        for i in gap..n {
            let mut j = i;
            while j >= gap && arr[j - gap] > arr[j] {
                arr.swap(j - gap, j);
                j -= gap;
            }
        }
        gap /= 2;
    }
}`,
  "C++": `void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int j = i;
            while (j >= gap && arr[j - gap] > arr[j]) {
                swap(arr[j - gap], arr[j]);
                j -= gap;
            }
        }
    }
}`,
};

const countingCode: Record<string, string> = {
  JavaScript: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr), min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  for (const v of arr) count[v - min]++;
  for (let i = 1; i < range; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[--count[arr[i] - min]] = arr[i];
  }
  return output;
}`,
  Python: `def counting_sort(arr):
    if not arr: return arr
    max_val, min_val = max(arr), min(arr)
    rng = max_val - min_val + 1
    count = [0] * rng
    output = [0] * len(arr)
    for v in arr: count[v - min_val] += 1
    for i in range(1, rng): count[i] += count[i - 1]
    for v in reversed(arr):
        count[v - min_val] -= 1
        output[count[v - min_val]] = v
    return output`,
  Java: `public static int[] countingSort(int[] arr) {
    if (arr.length == 0) return arr;
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    int[] count = new int[range];
    int[] output = new int[arr.length];
    for (int v : arr) count[v - min]++;
    for (int i = 1; i < range; i++) count[i] += count[i - 1];
    for (int i = arr.length - 1; i >= 0; i--) {
        output[--count[arr[i] - min]] = arr[i];
    }
    return output;
}`,
  Rust: `fn counting_sort(arr: &[i32]) -> Vec<i32> {
    if arr.is_empty() { return arr.to_vec(); }
    let max = *arr.iter().max().unwrap();
    let min = *arr.iter().min().unwrap();
    let range = (max - min + 1) as usize;
    let mut count = vec![0; range];
    let mut output = vec![0; arr.len()];
    for &v in arr { count[(v - min) as usize] += 1; }
    for i in 1..range { count[i] += count[i - 1]; }
    for &v in arr.iter().rev() {
        let idx = &mut count[(v - min) as usize];
        *idx -= 1;
        output[*idx] = v;
    }
    output
}`,
  "C++": `vector<int> countingSort(vector<int>& arr) {
    if (arr.empty()) return arr;
    int max = *max_element(arr.begin(), arr.end());
    int min = *min_element(arr.begin(), arr.end());
    int range = max - min + 1;
    vector<int> count(range, 0), output(arr.size());
    for (int v : arr) count[v - min]++;
    for (int i = 1; i < range; i++) count[i] += count[i - 1];
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[--count[arr[i] - min]] = arr[i];
    }
    return output;
}`,
};

const bogoCode: Record<string, string> = {
  JavaScript: `function isSorted(a) {
  for (let i = 1; i < a.length; i++)
    if (a[i - 1] > a[i]) return false;
  return true;
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
function bogoSort(arr) {
  const a = [...arr];
  while (!isSorted(a)) shuffle(a);
  return a;
}`,
  Python: `import random
def is_sorted(a):
    return all(a[i] <= a[i + 1] for i in range(len(a) - 1))

def bogo_sort(arr):
    a = arr.copy()
    while not is_sorted(a):
        random.shuffle(a)
    return a`,
  Java: `public static boolean isSorted(int[] a) {
    for (int i = 1; i < a.length; i++)
        if (a[i - 1] > a[i]) return false;
    return true;
}
public static void bogoSort(int[] arr) {
    Random rand = new Random();
    while (!isSorted(arr)) {
        for (int i = arr.length - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
}`,
  Rust: `use rand::seq::SliceRandom;
fn is_sorted(arr: &[i32]) -> bool {
    arr.windows(2).all(|w| w[0] <= w[1])
}
fn bogo_sort(arr: &mut [i32]) {
    let mut rng = rand::thread_rng();
    while !is_sorted(arr) { arr.shuffle(&mut rng); }
}`,
  "C++": `bool isSorted(int a[], int n) {
    for (int i = 1; i < n; i++)
        if (a[i - 1] > a[i]) return false;
    return true;
}
void bogoSort(int arr[], int n) {
    srand(time(0));
    while (!isSorted(arr, n)) {
        for (int i = n - 1; i > 0; i--) {
            int j = rand() % (i + 1);
            swap(arr[i], arr[j]);
        }
    }
}`,
};

export const algorithms: AlgorithmInfo[] = [
  {
    name: "Bubble Sort",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    code: bubbleCode,
    sort: bubbleSort,
  },
  {
    name: "Selection Sort",
    description: "Divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist and moves it to the sorted sublist.",
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    code: selectionCode,
    sort: selectionSort,
  },
  {
    name: "Insertion Sort",
    description: "Builds the final sorted array one element at a time. It picks each element and inserts it into its correct position among the previously sorted elements.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    code: insertionCode,
    sort: insertionSort,
  },
  {
    name: "Merge Sort",
    description: "A divide-and-conquer algorithm that divides the array into halves, recursively sorts each half, then merges the sorted halves back together.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    code: mergeCode,
    sort: mergeSort,
  },
  {
    name: "Quick Sort",
    description: "A divide-and-conquer algorithm that picks a pivot element, partitions the array around it, and recursively sorts the subarrays.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
    code: quickCode,
    sort: quickSort,
  },
  {
    name: "Heap Sort",
    description: "Builds a binary heap from the array, then repeatedly extracts the maximum element and rebuilds the heap until the array is sorted.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
    code: heapCode,
    sort: heapSort,
  },
  {
    name: "Shell Sort",
    description: "A generalization of insertion sort that allows the exchange of items that are far apart. It sorts elements at decreasing gaps, ending with a standard insertion sort.",
    complexity: { best: "O(n log n)", average: "O(n^(4/3))", worst: "O(n²)", space: "O(1)" },
    code: shellCode,
    sort: shellSort,
  },
  {
    name: "Counting Sort",
    description: "A non-comparison-based sort that counts occurrences of each value. It works best when the range of values is small relative to the number of elements.",
    complexity: { best: "O(n+k)", average: "O(n+k)", worst: "O(n+k)", space: "O(k)" },
    code: countingCode,
    sort: countingSort,
  },
  {
    name: "Bogo Sort",
    description: "A highly ineffective sorting algorithm that repeatedly shuffles the array and checks if it is sorted. Included for educational and entertainment value.",
    complexity: { best: "O(n)", average: "O(n·n!)", worst: "O(∞)", space: "O(1)" },
    code: bogoCode,
    sort: bubbleSort,
  },
];

export function randomArray(size: number = 24): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 20);
}
