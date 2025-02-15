import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriptionService]
    });

    service = TestBed.inject(SubscriptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête en attente n'est laissée
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch subscriptions', () => {
    const mockSubscriptions = [{ id: 1, status: 'ACTIVE' }];

    service.getSubscriptions().subscribe(data => {
      expect(data).toEqual(mockSubscriptions);
    });

    const req = httpMock.expectOne('http://localhost:8080/subscriptions');
    expect(req.request.method).toBe('GET');
    req.flush(mockSubscriptions);
  });
});
