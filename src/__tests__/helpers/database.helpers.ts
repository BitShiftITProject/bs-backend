import {UsersRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

// Clear the database before each test
// Ensures any failing test will leave the database in the state that
// caused the test to fail
export async function givenEmptyDatabase() {
  await new UsersRepository(testdb).deleteAll();
}


// import {Getter} from '@loopback/core';
// import {ProductRepository, CategoryRepository} from '../../repositories';
// import {testdb} from '../fixtures/datasources/testdb.datasource';

// export async function givenEmptyDatabase() {
//   let categoryRepository: CategoryRepository;
//   let productRepository: ProductRepository;

//   categoryRepository = new CategoryRepository(
//     testdb,
//     async () => productRepository,
//   );

//   productRepository = new ProductRepository(
//     testdb,
//     async () => categoryRepository,
//   );

//   await productRepository.deleteAll();
//   await categoryRepository.deleteAll();
// }
