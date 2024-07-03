#include <bits/stdc++.h>
using namespace std;
#define PI 3.1415926

struct coor_xy{
	double x;
	double y;
};

struct pyramid{
	const double length = 2;
	const double height = 2;
	
	double theta_x, theta_y;
	double pxh, nxh, pyh, nyh;
	double cx, cy;
	double hypox, hypoy;
	
	coor_xy n1, n2, n3, n4;
};

void BuildPyramid(pyramid&);
void printPosition(pyramid&);

int main(){
	pyramid p;
	double theta_x, theta_y;
	
	printf("input theta x y: ");
	while(scanf("%lf %lf", &theta_x, &theta_y) != EOF){
		p.theta_x = theta_x > 0 ? 180 - theta_x : -1 * theta_x, p.theta_y = theta_y > 0 ? 180 - theta_y : -1 * theta_y; 
		BuildPyramid(p);
		printPosition(p);
		
		printf("input theta x y: ");
	}
	
	return 0;
}

void BuildPyramid(pyramid &p){
	p.cx    = fabs(p.theta_x - 90) <= DBL_EPSILON ? 0 : p.height / tan(p.theta_x * PI / 180.0); //printf("%lf\n", p.cx);
	p.cy    = fabs(p.theta_y - 90) <= DBL_EPSILON ? 0 : p.height / tan(p.theta_y * PI / 180.0);
	p.hypox = abs(p.height / sin(p.theta_x * PI / 180.0)); //printf("%lf\n", p.hypox);
	p.hypoy = abs(p.height / sin(p.theta_y * PI / 180.0)); 
	p.pxh   = fabs(p.theta_x - 90) <= DBL_EPSILON ? sqrt(pow(p.length/2, 2) + pow(p.height, 2)) : sqrt(pow(p.hypox, 2) + 1 - 2 * p.hypox * cos(p.theta_x * PI / 180.0));
	p.nxh   = fabs(p.theta_x - 90) <= DBL_EPSILON ? sqrt(pow(p.length/2, 2) + pow(p.height, 2)) : sqrt(pow(p.hypox, 2) + 1 + 2 * p.hypox * cos(p.theta_x * PI / 180.0));
	p.pyh   = fabs(p.theta_y - 90) <= DBL_EPSILON ? sqrt(pow(p.length/2, 2) + pow(p.height, 2)) : sqrt(pow(p.hypoy, 2) + 1 - 2 * p.hypoy * cos(p.theta_y * PI / 180.0));
	p.nyh   = fabs(p.theta_y - 90) <= DBL_EPSILON ? sqrt(pow(p.length/2, 2) + pow(p.height, 2)) : sqrt(pow(p.hypoy, 2) + 1 + 2 * p.hypoy * cos(p.theta_y * PI / 180.0));
	
	p.n1.x  = p.pxh, p.n1.y = p.cy;
	p.n2.x  = p.cx , p.n2.y = p.pyh;
	p.n3.x  = p.nxh, p.n3.y = p.cy;
	p.n4.x  = p.cx , p.n4.y = p.nyh;
}

void printPosition(pyramid &p){
	printf("\nList:\n");
	printf("N1 --- x: %.2lf  y: %.2lf\n", p.n1.x, p.n1.y);
	printf("N2 --- x: %.2lf  y: %.2lf\n", p.n2.x, p.n2.y);
	printf("N3 --- x: %.2lf  y: %.2lf\n", p.n3.x, p.n3.y);
	printf("N4 --- x: %.2lf  y: %.2lf\n", p.n4.x, p.n4.y);
	printf("\n");
}
