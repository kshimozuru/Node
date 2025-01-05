// 3D回転行列の計算用ユーティリティ
export class Matrix3D {
  static rotateX(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      1, 0, 0,
      0, cos, -sin,
      0, sin, cos
    ];
  }

  static rotateY(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      cos, 0, sin,
      0, 1, 0,
      -sin, 0, cos
    ];
  }

  static rotateZ(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1
    ];
  }

  static multiply(a: number[], b: number[]) {
    return [
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
    ];
  }

  static transform(matrix: number[], point: { x: number, y: number, z: number }) {
    return {
      x: matrix[0] * point.x + matrix[1] * point.y + matrix[2] * point.z,
      y: matrix[3] * point.x + matrix[4] * point.y + matrix[5] * point.z,
      z: matrix[6] * point.x + matrix[7] * point.y + matrix[8] * point.z
    };
  }
}