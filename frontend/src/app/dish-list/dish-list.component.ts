// dish-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Dish {
  dish_id: string;
  name: string;
  price: number;
  availability: boolean;
}

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  newDish: Dish = { dish_id: '', name: '', price: 0, availability: false };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    // Update the URL to point to your backend server where the Flask application is running
    this.http.get<Dish[]>('http://localhost:5000/dishes').subscribe((data) => {
      this.dishes = data;
    });
  }

  addDish(): void {
    this.http.post<{ dish_id: string }>('http://localhost:5000/dishes', this.newDish).subscribe((data) => {
      this.newDish = { dish_id: '', name: '', price: 0, availability: false };
      this.fetchDishes();
    });
  }

  updateAvailability(dish: Dish): void {
    const updatedDish = { ...dish, availability: !dish.availability };
    this.http.put(`http://localhost:5000/dishes/${dish.dish_id}`, updatedDish).subscribe(() => {
      this.fetchDishes();
    });
  }

  deleteDish(dish: Dish): void {
    this.http.delete(`http://localhost:5000/dishes/${dish.dish_id}`).subscribe(() => {
      this.fetchDishes();
    });
  }
}
