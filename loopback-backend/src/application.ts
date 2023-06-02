import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  MyUserService,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {FacturasDataSource} from './datasources/facturas.datasource';
import {MongoDataSource} from './datasources/mongo.datasource';

export class LogeoApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    // This is where your User data will be stored.
    this.dataSource(MongoDataSource, UserServiceBindings.DATASOURCE_NAME);
    this.dataSource(FacturasDataSource); // Agrega esta línea para agregar el datasource de facturas
    // Bind the user service to the one in @loopback/authentication-jwt
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
