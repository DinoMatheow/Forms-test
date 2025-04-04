import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { authRoutes } from '../../../auth/auth.routes';



interface MenuItem {
  title: string;
  route: string;
}


const reactiveItems = reactiveRoutes[0].children  ??  [];

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {


reactiveMenu: MenuItem[] = reactiveItems
.filter((item)=> item.path !== '**')
.map((item)=> ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
}));


authMenu: MenuItem[] = [{
  title: 'register',
  route: '/auth'
},];


countryMenu: MenuItem[] = [{

   title: 'paises',
   route: '/country'
}]




}
