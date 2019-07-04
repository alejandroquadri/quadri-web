import { Component, OnInit } from '@angular/core';
import { faMapMarker, faEnvelope, faPhone, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook , faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailCaptureComponent } from '../../components';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public facebook = faFacebook;
  public instagram = faInstagram;
  public pinterest = faPinterest;
  public map = faMapMarker;
  public envelope = faEnvelope;
  public telephone = faPhone;
  public externalLinkIcon = faExternalLinkSquareAlt;

  // url = 'https://mediabrosonline.com/enlaces/quadri/enlaces.html';
  // link: any;

  constructor(
    private modalService: NgbModal
    // private sanitizer: DomSanitizer
  ) {
    // this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnInit() {
  }

  captureMail() {
    const modalRef = this.modalService.open(EmailCaptureComponent, { centered: true});
  }

}
