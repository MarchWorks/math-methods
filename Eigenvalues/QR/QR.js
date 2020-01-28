const transpose = (M) => {
  const B = new Array(M.length).fill(0).map(() => new Array(M.length).fill(0));
  for(let i=0; i<M.length; i++){
    for(let j=0; j<M.length; j++){
      B[j][i] = M[i][j]
    }
  }
  return B
}

const matrixDot = (M, N) => {
  var result = new Array(M.length).fill(0).map(() => new Array(N[0].length).fill(0));
  return result.map((row, i) => {
    return row.map((val, j) => {
      return M[i].reduce((sum, elm, k) => sum + (elm*N[k][j]) ,0)
    })
  })
}

const getH = (v) => {
  const u = [...v]
  u[0] += Math.sqrt(v.reduce((o, n) => o + n**2, 0));

  const H = (new Array(u.length).fill(0)).map(() => new Array(u.length).fill(0))
  for(let i=0; i<u.length; i++){
    for(let j=0; j<u.length; j++){
      if(i===j) H[i][j] = 1
      H[i][j] -= 2*u[i]*u[j]/u.reduce((o, n) => o + n**2, 0)
    }
  }

  return H
}

const pad = (H, dim) => {
  const result = (new Array(dim).fill(0)).map(() => new Array(dim).fill(0))
  for(let i=0; i<dim; i++){
    for(let j=0; j<dim; j++){
      if(i===j) result[i][j] = 1

      if(i >= dim - H.length && j >= dim - H.length){
        result[i][j] = H[i-(dim-H.length)][j-(dim-H.length)]
      }
    }
  }

  return result
}

const QR = (A) => {
	const n = A.length
	const m = A[0].length
	const holderMatrices = []
	let R = JSON.parse(JSON.stringify(A))
	for(let j=0; j<m-1; j++){
		const v = []
		R.forEach((row, index) => {
			if(index >= j){
				v.push(row[j])
			}
		})
		let H = getH(v)
		H = pad(H, n)
		R = matrixDot(H, R)
		holderMatrices.push(H)
	}

	let Q = transpose(holderMatrices[holderMatrices.length - 1])
	for (let i = holderMatrices.length - 2; i >= 0; i--) {
		Q = matrixDot(transpose(holderMatrices[i]), Q)
	}

	return {
		Q,
		R
	}
}
